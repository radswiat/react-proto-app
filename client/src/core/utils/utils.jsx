import _ from 'lodash';

export function isDefined(val) {
  return typeof val !== 'undefined';
}

export function isFunction(val) {
  return typeof val === 'function';
}

export function bindPayloadFormValue(form, id, payload, cb) {
  if (!(form)) {
    form = {};
  }
  if (/(\[[0-9]+\])/.test(id)) {
    let index = id.match(/(\[([0-9]+)\])/)[2];
    id = id.replace(/(\[[0-9]+\])/, '');

    if (!isDefined(form[id]) || !form[id]) {
      form[id] = [];
    }
    form[id][index] = payload;
  } else {
    form[id] = payload;
  }
  this.setState({
    form
  }, () => {
    if (typeof cb === 'function') {
      cb();
    }
  });
}

/**
 * Bind form value
 * WARNING! if value === on or off,
 * it will be rewritten to true, false ( material ui stupidity )
 * @param form
 * @param event
 * @param cb
 */
export function bindFormValue(form, event, cb) {
  let value = event.target.value;
  if (!form) {
    form = {};
  }
  if (value === 'on' || value === 'true') {
    value = true;
  } else
  if (value === 'off' || value === 'false') {
    value = false;
  }
  form[event.target.name] = value;
  this.setState({
    form
  }, () => {
    if (typeof cb === 'function') {
      cb();
    }
  });
}

/**
 * Dispatch async action
 */
export async function dispatchAsync(dispatch, action) {
  try {
    return await dispatch(action);
  } catch (err) {
    return err;
  }
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isExisty(value) {
  return (value !== null && value !== undefined);
}

export function isEmpty(value) {
  return (value === '');
}

/**
 * Check if value is set on the object
 * @example:
 * state.controls.hideField = true;
 * isSet(this.state, 'controls', 'hideFields') => returns true
 * @param props
 * @param paths
 * @returns {*}
 */
export function isSet(props, ...paths) {
  let prop = paths.shift();
  if (props[prop]) {
    if (paths.length) {
      return isSet(props[prop], ...paths);
    }
    return true;
  }
  return false;
}

/**
 * Are object values empty
 * - check if all props of object are empty
 * - check works only in ONE level !
 * @example:
 * data = {
 *  title: '',
 *  name: ''
 *  }
 *  areObjectValuesEmpty(data) => returns true
 * @param object
 * @returns {boolean}
 */
export function areObjectValuesEmpty(object) {
  let isEmpty = true;
  if (object) {
    for (let i of Object.keys(object)) {
      if (object[i].length) {
        return false;
      }
    }
  }
  return isEmpty;
}

/**
 * Helper for shouldComponentUpdate
 * @param source - ex: nextProps
 * @param target - ex: this.props
 * @param fields - ['data', 'update']
 * @returns {boolean}
 */
export function shouldUpdate(source, target, fields) {
  for (let field of fields) {
    if (!_.isEqual(source[field], target[field])) {
      return true;
    }
  }
  return false;
}

/**
 * Clean object
 * - remove empty values
 * - remove empty array keys
 */

export function clean(obj) {
  // clean array
  // - remove empty values
  let cleanArr = (arr) => {
    for (let i = arr.length; i >= 0; i--) {
      let type = typeof arr[i];
      if (type === 'object') {
        arr[i] = clean(arr[i]);
      } else
      if (type === 'string') {
        if (!arr[i].length) {
          arr.splice(i, 1);
        }
      }
    }
    return arr;
  };

  // clean key:value pair
  let cleanKey = (_obj, key) => {
    let type = typeof _obj[key];
    if (type === 'string') {
      if (!_obj[key].length) {
        delete _obj[key];
      }
    } else
    if (type === 'undefined') {
      delete _obj[key];
    }
    return _obj;
  };

  for (let a in obj) {
    if (Array.isArray(obj[a])) {
      obj[a] = cleanArr(obj[a]);
    } else
    if (typeof obj[a] === 'object') {
      obj[a] = clean(obj[a]);
    } else {
      obj = cleanKey(obj, a);
    }
  }

  return obj;
}

/**
 * Get first attribute from object
 */
export function getFirstAttr(obj) {
  return obj[Object.keys(obj)[0]];
}

export function Defer() {
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });
  this.then = this.promise.then.bind(this.promise);
  this.catch = this.promise.catch.bind(this.promise);
}

export function arrayMove(arr, oldIndex, newIndex) {
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length;
    while ((k--) + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
}
