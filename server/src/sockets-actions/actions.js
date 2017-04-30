import config from 'config';

export default class Actions {
  respond(cb, data) {
    setTimeout(() => {
      cb({
        success: true,
        data
      });
    }, config.WAIT_SOCKETS);
  }
}
