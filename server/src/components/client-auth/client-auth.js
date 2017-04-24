import uuid from 'node-uuid';

/**
 * ClientAuth
 * @singleton - use .get, do not make new Instance()
 */
export default class ClientAuth {

  static instance = null;
  clients = null;

  /**
   * Get static instance of ClientAuth
   * @static
   */
  static get() {
    if (!ClientAuth.instance) {
      ClientAuth.instance = new ClientAuth();
    }
    return ClientAuth.instance;
  }

  constructor() {

  }

  getClient(payload) {
    if (payload.type === 'client') {
      return {
        uuid: uuid.v4(),
        type: 'client'
      };
    }

    if (payload.type === 'preview-compiler') {
      return {
        uuid: uuid.v4(),
        type: 'preview-compiler'
      };
    }

    return null;

  }

}
