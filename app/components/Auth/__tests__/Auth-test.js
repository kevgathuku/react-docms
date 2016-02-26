'use strict';

import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Auth from '../index.jsx';
import Login from '../../Login/index.jsx';
import SignUp from '../../SignUp/index.jsx';

describe('Auth', function() {

  describe('Component Rendering', function() {
    it('displays the correct contents', function() {
      // It should find the correct content
      expect(shallow(<Auth />).text()).toMatch(/Login/);
      expect(shallow(<Auth />).text()).toMatch(/Signup/);
    });

    it('renders the correct component', function() {
      expect(shallow(<Auth />).is('.container')).toEqual(true);
      expect(shallow(<Auth />).find('.card-panel').length).toEqual(1);
    });

    it('renders the children components', function() {
      // It renders the provided child components
      const auth = shallow(<Auth />);
      expect(auth.contains(<Login />)).toEqual(true);
      expect(auth.contains(<SignUp />)).toEqual(true);
    });

    });
});
