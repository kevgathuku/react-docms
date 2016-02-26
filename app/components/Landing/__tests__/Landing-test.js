'use strict';

import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import Landing from '../index.jsx';

describe('Landing component', function() {
  it('renders the correct content', function() {
    expect(shallow(<Landing />).text()).toMatch(/Docue\s+is the simplest way for anyone to manage their documents online/);
    expect(shallow(<Landing />).text()).toMatch(/Get\s+Started/);
  });

  it('renders the correct component', function() {
    expect(shallow(<Landing />).is('#hero')).toEqual(true);
    expect(mount(<Landing />).find('#hero').length).toEqual(1);
  });
});
