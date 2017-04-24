import chalk from 'chalk';

export default class SocketsMocha {

  static instance;

  constructor() {
    console.log(chalk.red.bold('running sockets in TEST mode'));
    this.mockData = require('../../../test/utils/mock-data');
  }

  /**
   * Wrap data response with this one
   * @param data
   * @returns {{success: boolean, results: *}}
   */
  static response(data) {
    return {
      success: true,
      results: data
    };
  }

  /**
   * Wrap data fail with this one
   * @returns {{success: boolean}}
   */
  static throw(data) {
    return {
      success: false,
      results: data
    };
  }

  respond(data, resolve, reject) {
    if (data.success) {
      resolve(SocketsMocha.response(data.data));
    } else {
      reject(SocketsMocha.throw(data.data));
    }
  }

  /**
   * Fake emit
   * List of all possible actions:
   * client.on('collections:create', this.create.bind(this));
   * client.on('collections:get:all', this.get.bind(this));
   * client.on('collections:delete', this.delete.bind(this));
   * client.on('collections:update', this.update.bind(this));
   * client.on('collection-rows:create', this.create.bind(this));
   * client.on('collection-rows:get', this.get.bind(this));
   * client.on('document-rows:create', this.executeAction.bind(this, 'create'));
   * client.on('document-rows:get', this.executeAction.bind(this, 'get'));
   * client.on('document-rows:get:by:id', this.executeAction.bind(this, 'getById'));
   * client.on('document-rows:update', this.executeAction.bind(this, 'updateRow'));
   * client.on('documents:create', this.create.bind(this));
   * client.on('documents:get:all', this.get.bind(this));
   * client.on('documents:delete', this.delete.bind(this));
   * client.on('documents:update', this.update.bind(this));
   */
  emit(action, data, params) {
    return new Promise((resolve, reject) => {
      // if socketsAllData is set, always return this data
      if (typeof global.socketsAllData !== 'undefined') {
        if (global.socketsAllData) {
          this.respond(global.socketsAllData, resolve, reject);
          return;
        }
      }

      // check if we got global data defined
      // it is defined by: test/utils/mock-data on method: setSocketsData
      // - if it is defined, return this data by the action
      if (typeof global.socketsData !== 'undefined') {
        if (typeof global.socketsData[action] !== 'undefined') {
          this.respond(global.socketsData[action], resolve, reject);
          return;
        }
      }

      switch (action) {
        case 'document-rows:get':
          this.respond({
            success: true,
            data: null
          }, resolve, reject);
          return;
        case 'collections:create':
          this.respond({
            success: true,
            data: null
          }, resolve, reject);
          return;
        case 'collections:get:all':
          this.respond({
            success: true,
            data: null
          }, resolve, reject);
          return;
        case 'collections:delete':
          this.respond({
            success: true,
            data: null
          }, resolve, reject);
          return;
        default:
          this.respond({
            success: true,
            data: null
          }, resolve, reject);
          return;
      }
      resolve(SocketsMocha.response('adsads'));
    });
  }
}
