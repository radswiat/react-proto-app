import chai from 'chai';
import { expect as chaiExpect, assert as chaiAssert } from 'chai';
chai.config.includeStack = true;
chai.config.showDiff = true;

export const expect = chaiExpect;
export const assert = chaiAssert;

/**
 * Find a component
 * - will return false or a number ( count )
 * @param name
 * @param comp
 * @returns {boolean}
 */
export function findComponent(name, comp) {
  let rx = new RegExp(`((?!\/)(\<|\\()${name})`, 'g');
  let test = comp.debug().match(rx);
  return test ? test.length : false;
}

/**
 * Update component as a promise
 * @param comp
 */
export function update(comp, forceUpdate) {
  // perform a force update
  if (forceUpdate) {
    comp.update();
  }
  // return a promise, that will wait for a componentDidUpdate
  return new Promise((resolve) => {
    let instance = comp.instance();
    let oldComponentDidUpdate = instance.componentDidUpdate;
    instance.componentDidUpdate = function(...args) {
      if (oldComponentDidUpdate) {
        // restore original method
        instance.componentDidUpdate = oldComponentDidUpdate;
        // call original method
        oldComponentDidUpdate.apply(this, ...args);
      }
      resolve();
    };
  });
}
