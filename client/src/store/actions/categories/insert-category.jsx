import Actions from '../actions';

export default function (payload, dbParams) {
  return Actions.sockets.insert({
    reduxActionType: 'CATEGORIES_INSERT',
    socketActionName: 'categories:insert',
    payload,
    dbParams
  });
}
