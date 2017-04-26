export default class CategoriesReducer {

  /**
   * Define reducer name in store
   * ex: store[stateName]
   * @type {string}
   */
  static stateName = 'categories';

  /**
   * Initial loader
   * - will load reducer data on init
   * - its executed inside store.jsx
   * @returns {Promise.<{users: {}}>}
   */
  static initialLoader = async() => {
    return {
      categories: [{
        test: 1
      }]
    };
  };

  /**
   * Reducer
   * @param state
   * @param action
   * @returns {{}}
   */
  static reducer = (state = [], action) => {
    let newState = null;

    switch (action.type) {
      case 'DELETE_COLLECTION_PENDING':
        return state;
      default:
        return state;
    }
  }
}
