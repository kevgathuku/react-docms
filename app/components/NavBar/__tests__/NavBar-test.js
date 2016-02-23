import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import NavBar from '../index.jsx';

describe('NavBar component', function() {
  it('renders the correct content', function() {
    // It should find the correct title
    expect(shallow(<NavBar />).text()).toMatch(/Docue/);
    // It should render the correct menu items
    expect(shallow(<NavBar />).text()).toMatch(/Home/);
    expect(shallow(<NavBar />).text()).toMatch(/About/);
    expect(shallow(<NavBar />).text()).toMatch(/Login/);
  });

  it('renders the correct children components', function() {
    expect(shallow(<NavBar />).is('.transparent')).toEqual(true);
    // It should render the site logo
    expect(mount(<NavBar />).find('img').length).toEqual(1);
  });
});
