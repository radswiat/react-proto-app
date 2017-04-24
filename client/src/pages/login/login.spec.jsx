/* global describe, it */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import { expect, findComponent } from 'utils/utils';

import PageLogin from './login';

describe('pages/login', () => {
  // Globals
  let compGlobal;

  // Spies
  // Spies should be named as following:
  // - spy
  // - spyMethodName

  // Props

  // Context

  // Others

  // ===============================================================================================
  it('component should mount', () => {
    compGlobal = shallow(
      <PageLogin />
    );
    expect(compGlobal.find('div').length).to.be.least(1);
  });

});
