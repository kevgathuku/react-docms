import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Landing from '../index';

describe('Landing component', function() {
  it('renders the correct content', function() {
    expect(shallow(<Landing />).text()).to.match(/Docue\s+is the simplest way for anyone to manage their documents online/);
    expect(shallow(<Landing />).text()).to.match(/Get\s+Started/);
  });

  it('renders the correct div', function() {
    expect(shallow(<Landing />).is('#hero')).to.equal(true);
    expect(mount(<Landing />).find('#hero').length).to.equal(1);
  });
});
