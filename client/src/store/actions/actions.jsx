import debug from 'core/debug/debug';
import Sockets from 'core/sockets/sockets';

export default class Actions {
  static sockets = {
    insert: (type, socketsCallName, payload) => {
      return {
        type,
        payload: new Promise(async(resolve, reject) => {
          debug.log('SERVER_RESPONSE', 'BEFORE_GET_COL_ROW');
          try {
            let res = await Sockets.emit(socketsCallName, payload);
            debug.log('SERVER_RESPONSE', 'AFTER_GET_COL_ROW', res);
            resolve(res.results);
          } catch (err) {
            debug.log('SERVER_RESPONSE', 'AFTER_GET_COL_ROW:ERROR', err);
            reject(err);
          }
        })
      };
    }
  }
}
