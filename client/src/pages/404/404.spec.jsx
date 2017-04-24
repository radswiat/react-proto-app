/* global describe, it */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import { expect, findComponent } from 'utils/utils';

import Page404 from './404';

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
      <Page404 />
    );
    expect(compGlobal.find('div').length).to.be.least(1);
  });

});
