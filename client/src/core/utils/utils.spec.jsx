/* global describe, it */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect, assert } from 'utils/utils';
import {
  isDefined,
  bindPayloadFormValue,
  bindFormValue,
  getColorShade,
  dispatchAsync,
  isSet,
  areObjectValuesEmpty
} from './utils';
import _ from 'lodash';
import sinon from 'sinon';

describe('core/utils', () => {

  // isDefined =====================================================================================
  it('test isDefined method', () => {
    let test;
    expect(isDefined(test)).to.be.false;
    test = 'adsasd';
    expect(isDefined(test)).to.be.true;
  });

  // bindPayloadFormValue ==========================================================================
  // prepare context for bindPayloadFormValue tests
  // we need to call bindPayload... with a apply,
  // so we need a context ...
  let context = {};
  let spy = sinon.spy();
  context.state = {
    form: {
      list: []
    }
  };
  context.setState = (value, cb) => {
    context.state = _.merge(context.state, value);
    cb();
  };

  it('bindPayloadFormValue should bind value to state', () => {
    bindPayloadFormValue.apply(context, [context.state.form, 'title', 'React', spy]);
    expect(context.state.form.title).to.be.equal('React');
  });

  it('bindPayloadFormValue should bind value to state array', () => {
    bindPayloadFormValue.apply(context, [context.state.form, 'list[0]', 'React', spy]);
    expect(context.state.form.list[0]).to.be.equal('React');
  });

  it('bindPayloadFormValue should bind value to undefined state array', () => {
    bindPayloadFormValue.apply(context, [context.state.form, 'options[0]', 'React', spy]);
    expect(context.state.form.options[0]).to.be.equal('React');
  });

  it('bindPayloadFormValue callback should be called 3 times', () => {
    expect(spy.callCount).to.be.equal(3);
  });

  it('bindPayloadFormValue should bind value to state even if form is undefined', () => {
    context.state.form = undefined;
    bindPayloadFormValue.apply(context, [context.state.form, 'title', 'React', spy]);
    expect(context.state.form.title).to.be.equal('React');
  });

  // bindFormValue =================================================================================
  // prepare context for bindPayloadFormValue tests
  // we need to call bindPayload... with a apply,
  // so we need a context ...
  context = {};
  let spy2 = sinon.spy();
  context.state = {
    form: {
      list: []
    }
  };
  context.setState = (value, cb) => {
    context.state = _.merge(context.state, value);
    cb();
  };

  it('bindFormValue should bind value to state', () => {
    let event = { target: { name: 'title', value: 'React' }};
    bindFormValue.apply(context, [context.state.form, event, spy2]);
    expect(context.state.form.title).to.be.equal('React');
  });

  it('bindFormValue should bind value to state even if state is undefined', () => {
    let event = { target: { name: 'title', value: 'React' }};
    context.state.form = undefined;
    bindFormValue.apply(context, [context.state.form, event, spy2]);
    expect(context.state.form.title).to.be.equal('React');
  });

  it('bindFormValue callback should be called 2 times', () => {
    expect(spy2.callCount).to.be.equal(2);
  });

  // dispatchAsync =================================================================================
  let dispatch = async () => {
    return new Promise((resolve, reject) => {
      reject('Some errors');
    });
  };
  let action = () => {};

  it('dispatchAsync should return promise', () => {
    let res = dispatchAsync(dispatch, action);
    expect(typeof res.then === 'function').to.be.true;
  });

  it('dispatchAsync should throw error', async () => {
    expect(await dispatchAsync(dispatch, action)).to.be.equal('Some errors');
  });

  // isSet =========================================================================================
  let isSetObject = {
    title: 'test',
    address: {
      street: 'london rd',
      postcode: {
        main: 'RS9'
      }
    }
  };
  it('isSet should return true', () => {
    expect(isSet(isSetObject, 'title')).to.be.true;
    expect(isSet(isSetObject, 'address', 'street')).to.be.true;
    expect(isSet(isSetObject, 'address', 'postcode')).to.be.true;
  });

  it('isSet should return false', () => {
    expect(isSet(isSetObject, 'street')).to.be.false;
    expect(isSet(isSetObject, 'address', 'city')).to.be.false;
    expect(isSet(isSetObject, 'address', 'postcode', 'second')).to.be.false;
  });

  // areObjectValuesEmpty ==========================================================================
  let objectValuesEmpty = {
    title: '',
    name: '',
    surname: '',
    address: {
      street: 'asdasd',
      city: ''
    }
  };

  it('objectValuesEmpty should return true', () => {
    expect(areObjectValuesEmpty(objectValuesEmpty)).to.be.true;
  });

  it('objectValuesEmpty should return false', () => {
    objectValuesEmpty.name = 'John';
    expect(areObjectValuesEmpty(objectValuesEmpty)).to.be.false;
  });
});
