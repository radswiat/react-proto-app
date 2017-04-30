import Actions from '../actions';

export default class HandshakeActions extends Actions {

  async handshake(payload, cb) {
    this.respond(cb, 'ok');
  }

}
