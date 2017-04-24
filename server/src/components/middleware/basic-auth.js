import config from '../../config';
import * as auth from 'http-auth';

/**
 * Middleware, ResponseWait
 * - will slow down json responses to emulate server behaviour
 */
export default class basicAuthMiddleware {
  static apply(app) {
    let basic = auth.basic({
      realm: config.BASIC_AUTH.realm
    }, (username, password, callback) => {
      callback(username === config.BASIC_AUTH.username && password === config.BASIC_AUTH.password);
    });
    app.use(auth.connect(basic));
  }
}
