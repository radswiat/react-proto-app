const config = {
  SRC: {
    DOMAIN: 'localhost:80',
    SERVER_PORT: 80,
    // slow down json responses by xxx ms
    WAIT_MIDDLEWARE: 1000,
    // slow down sockets responses by xxx ms
    WAIT_SOCKETS: 400,
    WEBPACK_OFF: false,
    PATH_GUI: 'build',
    BASIC_AUTH: {
      realm: 'PRE2E',
      username: '',
      password: ''
    },
    db: {
      host: '127.0.0.1',
      port: 3001,
      credentials: {
        clientId: 'testClient',
        secret: 'superSecret'
      }
    },
    SYSTEM_PATHS: {
      compiler: '../preview-compiler/',
      logs: 'logs/',
      public: '../server/public/'
    },
    BROWSER_HISTORY: {
      pathExceptions: ['/graphql']
    },
    GRAPH_QL: {
    }
  }
};

export const graphqlConfig = {
  path: '/graphql'
};

export default config.SRC;

