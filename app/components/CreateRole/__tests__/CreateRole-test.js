'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { browserHistory } from 'react-router';
import RoleActions from '../../../actions/RoleActions';
import RoleStore from '../../../stores/RoleStore';
import CreateRole from '../index.jsx';

describe('CreateRole', function() {

  describe('Component Rendering', function() {
    it('renders the correct component', function() {
      expect(shallow(<CreateRole />).is('.container')).toEqual(true);
      expect(shallow(<CreateRole />).text()).toMatch(/Create Role/);
    });

    it('calls componentDidMount', () => {
      sinon.spy(CreateRole.prototype, 'componentDidMount');
      mount(<CreateRole />); // Mount the component
      expect(CreateRole.prototype.componentDidMount.called).toBe(true);
      CreateRole.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', () => {
      sinon.spy(CreateRole.prototype, 'componentWillUnmount');
      let createRole = mount(<CreateRole />); // Mount the component
      createRole.unmount();
      expect(CreateRole.prototype.componentWillUnmount.calledOnce).toBe(true);
      CreateRole.prototype.componentWillUnmount.restore();
    });
  });

  describe('Component Functions', function() {
    window.Materialize = {};

    var createRole;

    beforeEach(function() {
      window.Materialize.toast = sinon.spy();
      createRole = mount(<CreateRole />);
    });

    afterEach(function() {
      createRole.unmount();
    });

    describe('handleRoleCreateResult', function() {
      it('should correctly handle role creation', function() {
        sinon.spy(browserHistory, 'push');
        let role = {
          title: 'admin'
        };
        RoleStore.setCreatedRole(role);
        expect(RoleStore.getCreatedRole()).toBe(role);
        expect(window.Materialize.toast.withArgs('Role created successfully!').called).toBe(true);
        browserHistory.push.restore();
      });

      it('should correctly handle document creation error', function() {
        let errorResponse = {
          error: 'Error Occurred'
        };
        RoleStore.setCreatedRole(errorResponse);
        expect(RoleStore.getCreatedRole()).toBe(errorResponse);
        expect(window.Materialize.toast.withArgs(errorResponse.error).called).toBe(true);
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
        const instance = createRole.instance();
        sinon.spy(instance, 'handleFieldChange');
        instance.handleFieldChange(fieldChangeEvent);
        expect(createRole.state()[fieldChangeEvent.target.name]).toBe(fieldChangeEvent.target.value);
        instance.handleFieldChange.restore();
      });
    });

    describe('handleSubmit', function() {
      it('should not submit without a valid role', function() {
        // simulate the submit form event
        let createRoleEvent = {
          preventDefault: function() {}
        };
        const instance = createRole.instance();
        sinon.spy(instance, 'handleSubmit');
        sinon.spy(createRoleEvent, 'preventDefault');
        createRole.setState({
          role: null
        });
        // Submit the form
        createRole.find('form').simulate('submit', createRoleEvent);
        expect(createRoleEvent.preventDefault.called).toBe(true);
        expect(instance.handleSubmit.calledOnce).toBe(true);
        expect(window.Materialize.toast.withArgs('Please Provide a Role Title').called).toBe(true);
        instance.handleSubmit.restore();
      });

      it('should successfully submit if the form is valid', function() {
        sinon.stub(RoleActions, 'create').returns(true);
        // simulate the submit form event
        let createRoleEvent = {
          preventDefault: function() {}
        };
        sinon.spy(createRoleEvent, 'preventDefault');
        const instance = createRole.instance();
        sinon.spy(instance, 'handleSubmit');
        createRole.setState({
          title: 'viewer'
        });
        // Submit the form
        createRole.find('form').simulate('submit', createRoleEvent);
        expect(createRoleEvent.preventDefault.called).toBe(true);
        expect(instance.handleSubmit.calledOnce).toBe(true);
        expect(RoleActions.create.called).toBe(true);
        instance.handleSubmit.restore();
        RoleActions.create.restore();
      });
    });
  });

});
