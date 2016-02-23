import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NavBar from '../index.jsx';

describe('NavBar component', function() {
  it('renders the correct mobile links', function() {
    // It should find the correct title
    expect(shallow(<NavBar />).text()).toMatch(/Docue/);
    // It should render the correct menu items
    expect(shallow(<NavBar />).text()).toMatch(/Home/);
    expect(shallow(<NavBar />).text()).toMatch(/Sign Up/);
    expect(shallow(<NavBar />).text()).toMatch(/Login/);
  });

  it('renders the correct component', function() {
    expect(shallow(<NavBar />).is('.transparent')).toEqual(true);
    // It should render the site logo
    expect(shallow(<NavBar />).find('img').length).toEqual(1);
  });
});
