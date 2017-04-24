import express from 'express';
import http from 'http';
import path from 'path';
import { Sockets } from './sockets';
import config from './config';
import notify from './core/notify';
import helmet from 'helmet';
import { _try } from 'core/utils';
import log from 'core/log/log';
import db from 'db/mongod';

// components
import middlewareWebpackCompiler from './components/middleware/webpack-compiler';
import middlewareResponseWait from './components/middleware/response-wait';
import basicAuthMiddleware from './components/middleware/basic-auth';

/**
 * The server.
 *
 * @class Server
 */
export default class Server {

  app;
  http;
  env;

  /**
   * Bootstrap the server
   */
  static bootstrap(webpackConfig) {
    log.welcome();
    return new Server('dev', webpackConfig);
  }

  /**
   * Constructor.
   * @constructor
   */
  constructor(env, webpackConfig) {
    this.env = env;
    this.startup(webpackConfig);
  }

  async startup(webpackConfig) {

    _try('express', () => {
      this.app = express();
    });

    _try('server', () => {
      this.http = http.Server(this.app);
    });

    // webpack compiler middleware
    _try('webpack', () => {
      if (!config.WEBPACK_OFF) {
        middlewareWebpackCompiler.apply(this.app, webpackConfig);
      } else {
        log.status('WEBPACK', false, 'OFF');
      }
    });

    // response wait middleware
    middlewareResponseWait.apply(this.app);

    // basic auth middleware ( only on dist )
    if (process.argv.indexOf('--dist') >= 0) {
      basicAuthMiddleware.apply(this.app);
    }

    _try('config', () => {
      this.config();
    });

    this.port();

    _try('sockets', () => {
      Sockets.instance(this.http);
      new Sockets(this.http);
    });

    _try('helmet', () => {
      this.app.use(helmet());
    });

    _try('mongoose', () => {
      db.connect();
    });

  }

  /**
   * Set up server config
   * @method config
   */
  config() {
    this.app.use((req, res, next) => {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      next();
    });

    this.app.get('*', function (req, res) {
      res.sendFile(path.resolve(process.cwd(), config.PATH_GUI, 'index.html'));
    });

    /* eslint-disable */
    this.app.use('/reports', express.static(path.resolve(process.cwd(), './reports')));
    this.app.use('/coverage', express.static(path.resolve(process.cwd(), './coverage')));
    this.app.use('/doc', express.static(path.resolve(process.cwd(), './doc')));
    this.app.use('/', express.static(path.resolve(process.cwd(), config.PATH_GUI)));
  }

  /**
   * Set server port to use
   * @method port
   */
  port() {
    this.http.listen(config.SERVER_PORT, () => {
      log.info('server ready at', config.SERVER_PORT);
      if (!config.WEBPACK_OFF) {
        setTimeout(() => {
          log.info('Webpack build', 'wait');
        }, 4000);
      } else {
        log.status('Server', true);
        notify('Nightwatch online', 'WEBPACK [OFF]');
      }
    });
  }

}
