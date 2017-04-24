import io from 'socket.io';

// import actions
// import DocumentsActions from './actions/documents/documents.actions';
// import DocumentRowsActions from './actions/documents/document-rows.actions';
// import CollectionsActions from './actions/collections/collections.actions';
// import CollectionRowsActions from './actions/collections/collection-rows.actions';
// import GlobalCategoriesActions from './actions/globals/global-categories.actions';
// import GlobalRowsActions from './actions/globals/global-rows.actions';
// import HandshakeActions from './actions/handshake/handshake.actions';
// import PreviewActions from './actions/preview/preview.action';
// import PreviewCompilerCtrl from './actions/preview-compiler-ctrl/preview-compiler-ctrl';
// import ReleasesActions from './actions/releases/releases.actions';
// import DBDebug from './actions/db-debug/db-debug';

class Sockets {

  static instance;
  io;

  constructor(serverHttp) {
    this.io = io(serverHttp);
    this.io.on('connection', this.onNewConnection.bind(this));
  }

  /**
   * Get instance of the Sockets
   * @param http
   * @returns {any}
   */
  static instance(serverHttp) {
    if (!Sockets.instance) {
      Sockets.instance = new Sockets(serverHttp);
    }
    return Sockets.instance;
  }

  onNewConnection(client) {
    /* eslint-disable */
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

exports.Sockets = Sockets;
