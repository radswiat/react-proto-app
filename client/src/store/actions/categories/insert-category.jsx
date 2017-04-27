import Actions from '../actions';

export default function (payload, dbParams) {
  return Actions.sockets.insert({
    reduxActionType: 'INSERT_CATEGORIES',
    socketActionName: 'insert:categories',
    payload,
    dbParams
  });
}
