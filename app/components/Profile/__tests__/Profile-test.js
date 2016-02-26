'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Profile from '../index.jsx';
import UserActions from '../../../actions/UserActions';

describe('Profile', function() {

  before(function() {
    let user = {
      _id: 1,
      name: {
        first: 'Khaled',
        last: 'Another One'
      },
      role: {
        title: 'viewer'
      },
      email: 'khaled@anotherone.com'
    };
    var storage = sinon.stub(localStorage, 'getItem');
    storage.withArgs('userInfo').returns(JSON.stringify(user));
    storage.withArgs('user').returns('faketoken');
  });

  after(function() {
    localStorage.getItem.restore();
  });

  describe('Component Rendering', function() {

    it('renders the profile component by default', function() {
      expect(shallow(<Profile />).is('.container')).toEqual(true);
      expect(shallow(<Profile />).text()).toMatch(/My\s+Profile/);
    });

    it('calls componentDidMount', () => {
      sinon.spy(Profile.prototype, 'componentDidMount');
      mount(<Profile />); // Mount the component
      expect(Profile.prototype.componentDidMount.called).toBe(true);
      Profile.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', () => {
      sinon.spy(Profile.prototype, 'componentWillUnmount');
      let profile = mount(<Profile />); // Mount the component
      profile.unmount();
      expect(Profile.prototype.componentWillUnmount.calledOnce).toBe(true);
      Profile.prototype.componentWillUnmount.restore();
    });

    it('has the correct initial state', function() {
      const profile = shallow(<Profile />);
      expect(localStorage.getItem.withArgs('userInfo').called).toBe(true);
      expect(profile.state().profileDisplay).toEqual('block');
      expect(profile.state().editDisplay).toEqual('none');
      expect(profile.state().password).toEqual(null);
    });

    it('displays the edit form on edit click', function() {
      let toggleClickEvent = {
        preventDefault: function() {}
      };
      sinon.spy(toggleClickEvent, 'preventDefault');
      let profile = shallow(<Profile />);
      profile.find('a.btn-floating').simulate('click', toggleClickEvent);
      // The Edit form should be displayed
      expect(toggleClickEvent.preventDefault.called).toBe(true);
      expect(profile.text()).toMatch(/Edit\s+Profile/);
    });
  });

  describe('Class functions:', function() {
    window.Materialize = {};

    var profile;

    beforeEach(function() {
      window.Materialize.toast = sinon.mock();
      // simulate the edit button click to display the edit form
      let toggleClickEvent = {
        preventDefault: function() {}
      };
      sinon.spy(toggleClickEvent, 'preventDefault');
      profile = mount(<Profile />);
      profile.find('a.btn-floating').simulate('click', toggleClickEvent);
    });

    afterEach(function() {
      profile.unmount();
    });

    describe('comparePassword', function() {
      it('should return true if the passwords match', function() {
        const instance = profile.instance();
        sinon.spy(instance, 'comparePassword');
        instance.comparePassword('password', 'password');
        expect(instance.comparePassword.returnValues[0]).toBe(true);
        instance.comparePassword.restore();
      });

      it('should return false if the passwords don\'t match', function() {
        const instance = profile.instance();
        sinon.spy(instance, 'comparePassword');
        instance.comparePassword('password', 'paewewjwenfssword');
        expect(instance.comparePassword.returnValues[0]).toBe(false);
        instance.comparePassword.restore();
      });

      it('should return false if the password is under 6 chars', function() {
        const instance = profile.instance();
        sinon.spy(instance, 'comparePassword');
        instance.comparePassword('pass', 'pass');
        expect(instance.comparePassword.returnValues[0]).toBe(false);
        instance.comparePassword.restore();
      });

      it('should call comparePassword on submit click', function() {
        sinon.stub(UserActions, 'update').returns(true);
        // simulate the submit form event
        let editProfileEvent = {
          preventDefault: function() {}
        };
        const instance = profile.instance();
        sinon.spy(instance, 'handleSubmit');
        sinon.spy(instance, 'comparePassword');
        sinon.spy(editProfileEvent, 'preventDefault');
        profile.setState({
          password: 'pass',
          passwordConfirm: 'pass'
        });
        expect(profile.state().password).toEqual('pass');
        expect(profile.state().passwordConfirm).toEqual('pass');
        // Submit the edit form
        profile.find('button.btn.blue.center').simulate('click', editProfileEvent);
        expect(editProfileEvent.preventDefault.called).toBe(true);
        expect(instance.handleSubmit.calledOnce).toBe(true);
        expect(instance.comparePassword.called).toBe(true);
        // // Should call the Materialize toast function
        expect(window.Materialize.toast.called).toBe(true);
        instance.comparePassword.restore();
        instance.handleSubmit.restore();
        UserActions.update.restore();
      });

      it('should send the password if the passwords match', function() {
        sinon.stub(UserActions, 'update').returns(true);
        let editProfileEvent = {
          preventDefault: function() {}
        };
        let passwordStates = {
          password: 'password',
          passwordConfirm: 'password'
        };
        const instance = profile.instance();
        sinon.spy(instance, 'handleSubmit');
        sinon.spy(instance, 'comparePassword');
        sinon.spy(editProfileEvent, 'preventDefault');
        profile.setState(passwordStates);
        // Submit the edit form
        profile.find('button.btn.blue.center')
          .simulate('click', editProfileEvent);
        // Confirm the form was submitted
        expect(editProfileEvent.preventDefault.called).toBe(true);
        expect(instance.handleSubmit.calledOnce).toBe(true);
        expect(instance.comparePassword.withArgs(
            profile.state().password,
            profile.state().passwordConfirm
          ).called).toBe(true);
        let payload = {
            firstname: profile.state().firstname,
            lastname: profile.state().lastname,
            email: profile.state().email,
            password: profile.state().password
        };
        expect(UserActions.update.withArgs(profile.state().user._id, payload, profile.state().token).called).toBe(true);
        expect(UserActions.update.called).toBe(true);
        instance.comparePassword.restore();
        UserActions.update.restore();
      });

      it('should not send password if it has not changed', function() {
        sinon.stub(UserActions, 'update').returns(true);
        let editProfileEvent = {
          preventDefault: function() {}
        };
        const instance = profile.instance();
        sinon.spy(instance, 'handleSubmit');
        sinon.spy(instance, 'comparePassword');
        sinon.spy(editProfileEvent, 'preventDefault');
        profile.setState({
          password: 'password'
        });
        // Submit the edit form
        profile.find('button.btn.blue.center')
          .simulate('click', editProfileEvent);
        // Confirm the form was submitted
        expect(editProfileEvent.preventDefault.called).toBe(true);
        expect(instance.handleSubmit.calledOnce).toBe(true);
        let payload = {
            firstname: profile.state().firstname,
            lastname: profile.state().lastname,
            email: profile.state().email
        };
        expect(UserActions.update.called).toBe(true);
        expect(UserActions.update.withArgs(profile.state().user._id, payload, profile.state().token).called).toBe(true);
        instance.comparePassword.restore();
        UserActions.update.restore();
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
        const instance = profile.instance();
        sinon.spy(instance, 'handleFieldChange');
        instance.handleFieldChange(fieldChangeEvent);
        expect(profile.state()[fieldChangeEvent.target.name]).toBe(fieldChangeEvent.target.value);
        instance.handleFieldChange.restore();
      });

      it('should correctly update the confirm password state', function() {
        let fieldChangeEvent = {
          target: {
            name: 'confirm-password',
            value: 'my@email.com'
          },
          preventDefault: function() {}
        };
        const instance = profile.instance();
        sinon.spy(instance, 'handleFieldChange');
        instance.handleFieldChange(fieldChangeEvent);
        expect(profile.state().passwordConfirm).toBe(fieldChangeEvent.target.value);
        instance.handleFieldChange.restore();
      });
    });

    describe('handleEditToggle', function() {
      it('should toggle the edit form', function() {
        let toggleClickEvent = {
          preventDefault: function() {}
        };
        const instance = profile.instance();
        sinon.spy(instance, 'handleEditToggle');
        // Click on the form's cancel button to revert to the profile view
        profile.find('button.red.center').simulate('click', toggleClickEvent);
        expect(profile.state().editDisplay).toBe('none');
        expect(profile.state().profileDisplay).toBe('block');
        expect(profile.text()).toMatch(/My\s+Profile/);
      });
    });
  });
});
