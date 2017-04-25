import Actions from '../actions';

export default function (payload) {
  let type = 'INSERT_CATEGORIES';
  return Actions.sockets.insert(type, 'categories', payload);
}
