import _ from 'lodash';

const defaultParams = {
  /**
   * Selector filter,
   * - by default it won't match anything
   * - has to be always given through props
   * @param item
   * @returns {boolean}
   */
  filter: () => {
    return false;
  },
  /**
   * Filter return,
   * - before returning, you can decide what should be returned,
   * - by default it will return the whole filtered value ( array )
   * @param value
   * @returns {*}
   */
  filterReturn: (value) => {
    return value;
  },
  /**
   * Dispatcher
   * - when data was not found dispatcher will be called to load the data
   * - if null, it will not be called and selector will return null
   */
  dispatcher: null,
  /**
   * After dispatcher has loaded the data, data will be passed to selector again to re-filter,
   * if you want to specify what should be passed to selector, overwrite this method
   * @param data
   * @returns {string|string|string|*}
   */
  dispatcherData: (data) => {
    return data.value;
  }
};

/**
 * Filter
 * @param state
 * @param params
 * @returns {boolean}
 */
function _filter(state, params) {
  let selected = state.filter((item, key) => {
    return params.filter(item, key);
  });
  // we only need first object, as it will be always just one
  // and also we just want history returned
  return selected.length ? params.filterReturn(selected) : false;
}

/**
 * Select method
 * @param state
 * @param params
 * @param secondAttempt
 * @returns {Promise.<*>}
 * @private
 */
async function _select(state, params, secondAttempt) {
  // get selected items
  let selected = _filter(state, params);
  // if we got selected items, return them
  if (selected) {
    return selected;
  }
  // if this is a second attempt, and it failed to select, return null
  if (secondAttempt) {
    return null;
  }
  // if nothing found, load it up !
  if (params.dispatcher) {
    let data = await params.dispatcher();
    if (data) {
      return _select(params.dispatcherData(data), params, true);
    }
    return null;
  }
  return null;
}

/**
 * Exported select method
 * - it will try to select by the current state
 * - if it will fail, it will dispatch action to load it up,
 * - if it will fail again, will return null
 * @param state
 * @param params
 * @returns {Promise.<*>}
 */
export async function select(state, params) {
  return _select(state, _.merge(_.clone(defaultParams), params), false);
}

/**
 * Fake dispatch
 * - when no dispatch avail,
 *   you can use this method to handle the promise
 */
export async function fakeDispatch(cmd) {
  let value = null;
  let wrap = await cmd.payload;
  if (typeof wrap.results !== 'undefined') {
    value = wrap.results;
  } else {
    value = wrap;
  }
  return {
    value
  };
}
