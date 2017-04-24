import config from '../../config';

/**
 * Middleware, ResponseWait
 * - will slow down json responses to emulate server behaviour
 */
export default class responseWaitMiddleware {
  static apply(app) {
    app.use((req, res, next) => {
      if (/(\.json)$/.test(req.url)) {
        setTimeout(next, config.WAIT_MIDDLEWARE);
        return;
      }
      next();
    });
  }
}
