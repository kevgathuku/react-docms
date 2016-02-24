'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import SignUp from '../index.jsx';

describe('SignUp', function() {

  describe('Component Rendering', function() {
    it('displays the correct contents', function() {
      // It should find the correct content
      expect(shallow(<SignUp />).text()).toMatch(/First Name/);
      expect(shallow(<SignUp />).text()).toMatch(/Sign up/);
    });

    it('renders the correct component', function() {
      expect(shallow(<SignUp />).is('.row')).toEqual(true);
      expect(shallow(<SignUp />).find('.input-field').length).toEqual(5);
    });

    it('calls componentDidMount', () => {
      sinon.spy(SignUp.prototype, 'componentDidMount');
      mount(<SignUp />); // Mount the component
      expect(SignUp.prototype.componentDidMount.called).toBe(true);
      SignUp.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', () => {
      sinon.spy(SignUp.prototype, 'componentWillUnmount');
      let signUp = mount(<SignUp />); // Mount the component
      signUp.unmount();
      expect(SignUp.prototype.componentWillUnmount.calledOnce).toBe(true);
      SignUp.prototype.componentWillUnmount.restore();
    });

  });
});
