import express from 'express';
import http from 'http';
import path from 'path';
import Sockets from './sockets';
import config from './config';
import notify from './core/notify';
import helmet from 'helmet';
import { _try } from 'core/utils/utils';
import log from 'core/log/log';
import db from 'db/mongod';
import { includes } from 'lodash';

// graphql
import GraphQLService from 'db/graphql/graphql';

// components
import middlewareWebpackCompiler from './components/middleware/webpack-compiler';
import middlewareResponseWait from './components/middleware/response-wait';
import basicAuthMiddleware from './components/middleware/basic-auth';
import MacroInjector from './components/macro-injector/macro-injector'
// import sockets actions
import HandshakeActions from 'sockets-actions/handshake/handshake';
import CategoriesActions from 'sockets-actions/categories/categories';

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

    _try('helmet', () => {
      this.app.use(helmet());
    });

    _try('mongoose', () => {
      db.connect();
    });

    _try('browser-history', () => {
      this.setupBrowserHistory();
    });

    _try('graphql-service', () => {
      let graphql = new GraphQLService(this.app);
      graphql.connect(this.app);
    });

    this.setupSockets();
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

    /* eslint-disable */
    this.app.use('/reports', express.static(path.resolve(process.cwd(), './reports')));
    this.app.use('/coverage', express.static(path.resolve(process.cwd(), './coverage')));
    this.app.use('/macro-recorder', express.static(path.resolve(process.cwd(), '../macro-recorder/build')));
    this.app.use('/', express.static(path.resolve(process.cwd(), config.PATH_GUI)));

    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    new MacroInjector(this.app);


  }

  /**
   * Add support for browser history
   * - example:
   *    Allow migration
   *    from: localhost/#/categories/52
   *    to: localhost/categories/52
   * - exclude express api path from this rule ( config.BROWSER_HISTORY )
   */
  setupBrowserHistory() {
    this.app.get('*', (req, res, next) => {
      if (includes(config.BROWSER_HISTORY.pathExceptions, req._parsedUrl.pathname)) {
        next();
        return;
      }
      res.sendFile(path.resolve(process.cwd(), config.PATH_GUI, 'index.html'));
    });
  }

  setupSockets() {
    _try('sockets', () => {
      this.sockets = new Sockets(this.http);
    });
    this.setupSocketsActions();
  }

  setupSocketsActions() {
    this.sockets.registerActionClass({
      class: HandshakeActions,
      actions: [
        ['handshake', 'handshake', { auth: true }]
      ]
    });
    this.sockets.registerActionClass({
      class: CategoriesActions,
      actions: [
        ['categories:insert', 'insert', { auth: true }]
      ]
    });
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
