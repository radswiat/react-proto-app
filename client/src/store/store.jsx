import promiseMiddleware from 'redux-promise-middleware';
import { routerReducer } from 'react-router-redux';
import * as asyncInitialState from 'redux-async-initial-state';
import persistState from 'redux-localstorage';
import Promise from 'bluebird';
import _ from 'lodash';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// import reducers
import CategoriesReducer from 'store/reducers/categories/categories.reducer';

/**
 * Redux store creator
 * - to add new reducer import it at the top and add into customReducers
 * - to add new plugin reducer add it into pluginReducers
 * @example <caption>How to use it</caption>
 * import Store from './store';
 * let store = Store.createStore()
 */
class Store {

  enhancers = null;
  reducers = null;
  middleware = null;

  /**
   * Custom reducers,
   * - here goes reducers that you had created,
   * - register here any new reducer,
   *   you don't have to add it anywhere else in this file,
   *   just follow the reducer architecture
   * @type {[redux-reducer]}
   */
  static customReducers = [
    CategoriesReducer
  ];

  /**
   * Plugin reducers
   * - here goes reducers from any plugin you want to use
   * - just add them into the list as normal
   * @type {{reducerKey: reducer}}
   */
  static pluginReducers = {
    asyncInitialState: asyncInitialState.innerReducer,
    routing: routerReducer
  };

  /**
   * Create store
   * - it will create instance of Store
   * - it won't return instance of Store but a REDUX store
   * @static
   * @returns {redux store}
   */
  static createStore() {
    let store = new Store();
    return store.getReduxStore();
  }

  /**
   * Constructor describe how redux store is created,
   * step by step
   * - this constructor is private, to create a store use static createStore
   * @private
   */
  constructor() {
    this.enableChromeDebugTools();
    let reducers = this.mergeReducers();
    this.setReducers(
      this.combineReducers(reducers)
    );
    this.applyMiddleware();
  }

  /**
   * Enable chrome debug tools
   * @private
   * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
   */
  enableChromeDebugTools() {
    this.enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  /**
   * Merge custom reducers with plugin reducers
   * @private
   */
  mergeReducers() {
    let reducers = Store.pluginReducers;
    Store.customReducers.forEach((reducer) => {
      reducers[reducer.stateName] = reducer.reducer;
    });
    return reducers;
  }

  /**
   * Combine reducers
   * - it uses redux combineReducers method
   * @private
   * @param reducers
   */
  combineReducers(reducers) {
    return asyncInitialState.outerReducer(combineReducers(reducers));
  }

  /**
   * Set final reducers
   * @param reducers
   */
  setReducers(reducers) {
    this.reducers = reducers;
  }

  /**
   * Apply redux middleware
   * @private
   */
  applyMiddleware() {
    // apply store middleware
    this.middleware = applyMiddleware(
      thunk,
      promiseMiddleware(),
      asyncInitialState.middleware(Store.loadReducerInitialState)
    );
  }

  /**
   * Load reducers initial state
   * - combined gives the initial store data
   * - loop through all reducers calling .initialLoader
   * @private
   */
  static loadReducerInitialState(currentState) {
    return new Promise((resolve) => {
      let reducersInitialStatesLoader = Store.customReducers.map((reducer) => {
        if (!reducer.initialLoader) { return null; }
        return reducer.initialLoader();
      });
      // resolve all initialLoaders of reducers
      // then update the store states
      Promise.all(reducersInitialStatesLoader).then((response) => {
        let data = currentState;
        response.forEach((chunk) => {
          _.merge(data, chunk);
        });
        resolve(
          data
        );
      });
    });
  }

  /**
   * Returns redux store
   * @public
   */
  getReduxStore() {
    return createStore(
      this.reducers,
      this.enhancers(
        this.middleware,
        persistState(['appState'])
      )
    );
  }
}

// export store as a instance,
// - it will allow us to access it without component
//   + useful for re-selectors
export default Store.createStore();
