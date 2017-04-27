import debug from 'core/debug/debug';
import Sockets from 'core/sockets/sockets';

export default class Actions {
  static sockets = {
    insert: ({reduxActionType, socketActionName, payload, dbParams}) => {
      return {
        type: reduxActionType,
        payload: new Promise(async(resolve, reject) => {
          debug.log('SERVER_RESPONSE', `BEFORE [${socketActionName}]`);
          try {
            let res = await Sockets.emit(socketActionName, payload, dbParams);
            debug.log('SERVER_RESPONSE', `AFTER [${socketActionName}]`, res);
            resolve(res.results);
          } catch (err) {
            debug.log('SERVER_RESPONSE', `AFTER [${socketActionName}] ERROR`, err);
            reject(err);
          }
        })
      };
    }
  }
}
