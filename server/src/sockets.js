import io from 'socket.io';
import chalk from 'chalk';
import { isFunction } from 'core/utils/utils';

export default class Sockets {

  io;
  registeredActionClasses = [];

  constructor(serverHttp) {
    this.io = io(serverHttp);
    this.io.on('connection', this.onNewConnection.bind(this));
  }

  registerActionClass(params) {
    this.registeredActionClasses.push(params);
  }

  onNewConnection(client) {

    console.log(chalk.green('onNewConnection'));

    // iterate through every actionClass
    // - instantiate class
    // - set up socket actions
    for (let actionClass of this.registeredActionClasses) {
      // instantiate class
      let classInstance = new actionClass.class({
        io: this.io,
        client
      });

      // iterate through every action
      for (let action of actionClass.actions) {
        let actionName = action[0];
        let actionMethod = action[1];
        if (isFunction(classInstance[actionMethod])) {
          client.on(actionName, classInstance[actionMethod].bind(classInstance));
        } else {
          console.log('---- wrong!');
        }
      }
    }

    // new CategoriesActions({
    //   io: this.io,
    //   client,
    //   actions: ['create:category', 'createCategory', { auth: true }]
    // });
    // new DocumentsActions(this.io, client);
    // new DocumentRowsActions(this.io, client);
    // new CollectionsActions(this.io, client);
    // new CollectionRowsActions(this.io, client);
    // new GlobalCategoriesActions(this.io, client);
    // new GlobalRowsActions(this.io, client);
    // new HandshakeActions(this.io, client);
    // new PreviewActions(this.io, client);
    // new PreviewCompilerCtrl(this.io, client);
    // new ReleasesActions(this.io, client);
    // new DBDebug(this.io, client);
  }

}

