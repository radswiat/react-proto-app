import chalk from 'chalk';
import Actions from '../actions';

export default class CollectionsActions extends Actions {

  constructor(io, client) {
    super();
    this.io = io;
    this.client = client;
  }

  insert(payload, cb) {
    console.log(chalk.red('---- sockets: create: category -------'));
  }

  // /**
  //  * Get collections
  //  * TODO: more queries avail ? Like limit, get by id etc
  //  * @param payload
  //  * @param cb
  //  * @returns {Promise.<void>}
  //  */
  // async get(payload, cb) {
  //   console.log(chalk.green.bold('get:collections'));
  //   console.log(payload);
  //
  //   // remove clientUuid from data
  //   if (typeof payload.data.clientUuid !== 'undefined') {
  //     delete payload.data.clientUuid;
  //   }
  //
  //   let data = await dadiClient.get(this.dadiEndpoints.get);
  //   // validate the response
  //   if (typeof data.results !== 'undefined') {
  //     this.respond(cb, data);
  //   } else {
  //     this.throw(cb, data);
  //   }
  // }
}
