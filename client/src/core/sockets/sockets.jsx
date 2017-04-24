import io from 'socket.io-client';
import { env } from 'config';
import SocketsMocha from './sockets-mocha';

export class Sockets {

  awaitingHandshake = null;
  clientUuid = null;
  clientType = null;
  clientRole = null;

  constructor() {
    console.warn('running sockets in DEV mode');
    this.client = io();
  }

  /**
   * Make a server handshake
   * @private
   */
  clientHandshake() {
    // if handshake already in progress
    if (this.awaitingHandshake) {
      return this.awaitingHandshake;
    }
    // make a handshake
    this.awaitingHandshake = new Promise((resolve) => {
      if (!this.clientUuid) {
        this.client.emit('handshake', { type: 'client' }, (res) => {
          this.setClientUuid(res);
          resolve();
          this.awaitingHandshake = null;
        });
      } else {
        this.awaitingHandshake = null;
        resolve();
      }
    });
    return this.awaitingHandshake;
  }

  /**
   * Set client Uuid
   * - uuid is used to identify user
   * - clientType and clientRole is set here as well
   * @param res
   */
  setClientUuid(res) {
    if (!res.success) {
      return;
    }
    this.clientUuid = res.data.uuid;
    this.clientType = res.data.type;
  }

  /**
   * Get client uuid
   * @returns {*}
   */
  getClientUuid() {
    return this.clientUuid;
  }

  once(action, cb) {
    if (!this.client) {
      return;
    }
    this.client.once(action, cb);
  }

  /**
   * Listen for sockets, till the end
   * ( last res has to send the:
   *  {
   *    action: 'end'
   *  }
   *  )
   * @param action
   * @param cb
   */
  tillEnd(action, cb) {
    if (!this.client) {
      return;
    }
    this.client.on(action, (res) => {
      if (res.action === 'end') {
        this.client.off(action);
      }
      cb(res);
    });
  }

  /**
   * Proxy for emit
   * - proxy emit with an handshake call
   * Do a clientHandshake, and when that is resolved,
   * make an emit
   * @param action
   * @param data
   */
  emit(action, data, params) {
    if (!this.client) {
      return new Promise((resolve, reject) => {
        reject({
          success: false,
          statusCode: 'sockets_off',
          messages: 'sockets not connected'
        });
      });
    }

    return new Promise((resolve, reject) => {
      this.clientHandshake().then(() => {
        this._emit(resolve, reject, action, data, params);
      });
    });
  }

  /**
   * Make a socket emit
   * - this has always be called throught this.emit method as a proxy
   * @param resolve - resolve from this.emit
   * @param reject - reject from this.emit
   * @param action - emit action to perform
   * @param data - emit data to perform
   * @private
   */
  _emit(resolve, reject, action, data = {}, params = {}) {
    // before emit, lets extends it with clientUuid
    params.clientUuid = this.clientUuid;
    // emit
    this.client.emit(action, {
      data,
      params
    }, (response) => {
      if (response.success) {
        resolve(response.data);
      } else {
        reject(response);
      }
    });
  }
}

let sockets;
if (!env.MOCHA) {
  sockets = new Sockets();
} else {
  sockets = new SocketsMocha();
}
export default sockets;
