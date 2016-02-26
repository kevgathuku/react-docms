'use strict';

import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NotFound from '../index.jsx';

describe('Not Found', function() {
  it('renders the correct content', function() {
    expect(shallow(<NotFound />).is('.container')).toEqual(true);
    expect(shallow(<NotFound />).text()).toMatch(/Not Found/);
    expect(shallow(<NotFound />).text()).toMatch(
      /This is not the page you were looking for/);
  });
});
