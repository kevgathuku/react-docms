'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { browserHistory } from 'react-router';
import UserActions from '../../../actions/UserActions';
import UserStore from '../../../stores/UserStore';
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

  describe('Class Functions', function() {
    window.Materialize = {};

    var signUp;

    beforeEach(function() {
      window.Materialize.toast = sinon.spy();
      signUp = mount(<SignUp />);
    });

    afterEach(function() {
      signUp.unmount();
    });

    describe('comparePassword', function() {
      it('should return false if the passwords don\'t match', function() {
        const instance = signUp.instance();
        sinon.spy(instance, 'comparePassword');
        instance.comparePassword('password', 'klenfwnfef');
        expect(instance.comparePassword.returnValues[0]).toBe(false);
        instance.comparePassword.restore();
      });

      it('should return true if the passwords match', function() {
        const instance = signUp.instance();
        sinon.spy(instance, 'comparePassword');
        instance.comparePassword('password', 'password');
        expect(instance.comparePassword.returnValues[0]).toBe(true);
        instance.comparePassword.restore();
      });

      it('should return false if the password is under 6 chars', function() {
        const instance = signUp.instance();
        sinon.spy(instance, 'comparePassword');
        instance.comparePassword('pass', 'pass');
        expect(instance.comparePassword.returnValues[0]).toBe(false);
        instance.comparePassword.restore();
      });
    });

    describe('handleSignup', function() {
      it('should return the correct result if signup is valid', function() {
        sinon.spy(browserHistory, 'push');
        sinon.spy(localStorage, 'setItem');
        sinon.spy(UserStore, 'getSession');
        // Trigger a change in the signup store
        let response = {
          token: 'weknfe',
          user: {
            name: 'kevin',
            role: {
              title: 'viewer'
            }
          }
        };
        UserStore.setSignupResult(response);
        // Should be handled correctly
        expect(UserStore.getSignupResult()).toBeA('object');
        expect(localStorage.setItem.withArgs('user').called).toBe(true);
        expect(localStorage.setItem.withArgs('userInfo').called).toBe(true);
        expect(browserHistory.push.withArgs('/dashboard').called).toBe(true);
        localStorage.removeItem.restore();
      });

      it('should return the correct result if signup raised error', function() {
        // Trigger a change in the signup store
        let response = {
          error: 'Error Occurred'
        };
        UserStore.setSignupResult(response);
        // Should be handled correctly
        expect(UserStore.getSignupResult()).toBeA('object');
        expect(window.Materialize.toast.withArgs(response.error).called).toBe(true);
      });
    });

    describe('handleFieldChange', function() {
      it('should correctly update the state', function() {
        let fieldChangeEvent = {
          target: {
            name: 'email',
            value: 'my@email.com'
          },
          preventDefault: function() {}
        };
        const instance = signUp.instance();
        sinon.spy(instance, 'handleFieldChange');
        instance.handleFieldChange(fieldChangeEvent);
        expect(signUp.state()[fieldChangeEvent.target.name]).toBe(fieldChangeEvent.target.value);
        instance.handleFieldChange.restore();
      });

      it('should correctly update the confirm password state', function() {
        let fieldChangeEvent = {
          target: {
            name: 'password-confirm',
            value: 'my@email.com'
          },
          preventDefault: function() {}
        };
        const instance = signUp.instance();
        sinon.spy(instance, 'handleFieldChange');
        instance.handleFieldChange(fieldChangeEvent);
        expect(signUp.state().passwordConfirm).toBe(fieldChangeEvent.target.value);
        instance.handleFieldChange.restore();
      });
    });

    describe('handleSubmit', function() {
      it('should call comparePassword on submit click', function() {
        sinon.stub(UserActions, 'signup').returns(true);
        // simulate the submit form event
        let signUpEvent = {
          preventDefault: function() {}
        };
        const instance = signUp.instance();
        sinon.spy(instance, 'handleSubmit');
        sinon.spy(instance, 'comparePassword');
        sinon.spy(signUpEvent, 'preventDefault');
        signUp.setState({
          password: 'password',
          passwordConfirm: 'password'
        });
        // Submit the form
        signUp.find('form').simulate('submit', signUpEvent);
        expect(signUpEvent.preventDefault.called).toBe(true);
        expect(instance.handleSubmit.calledOnce).toBe(true);
        expect(instance.comparePassword.called).toBe(true);
        instance.comparePassword.restore();
        instance.handleSubmit.restore();
        UserActions.signup.restore();
      });
    });

  });

});
