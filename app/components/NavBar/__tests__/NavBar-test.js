import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import NavBar from '../index.jsx';

describe('NavBar component', function() {
  it('renders the correct content', function() {
    // It should find the correct title
    expect(shallow(<NavBar />).text()).to.match(/Docue/);
    // It should render the correct menu items
    expect(shallow(<NavBar />).text()).to.match(/Home/);
    expect(shallow(<NavBar />).text()).to.match(/About/);
    expect(shallow(<NavBar />).text()).to.match(/Login/);
  });

  it('renders the correct children components', function() {
    expect(shallow(<NavBar />).is('.transparent')).to.equal(true);
    // It should render the site logo
    expect(mount(<NavBar />).find('img').length).to.equal(1);
  });
});
