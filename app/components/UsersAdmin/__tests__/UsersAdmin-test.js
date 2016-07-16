'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import RoleStore from '../../../stores/RoleStore';
import UserStore from '../../../stores/UserStore';
import RoleActions from '../../../actions/RoleActions';
import UserActions from '../../../actions/UserActions';
import UsersAdmin from '../index.jsx';

describe('UsersAdmin', function() {

  describe('Component Rendering', function() {
    it('renders the correct component', function() {
      expect(shallow(<UsersAdmin />).is('.container')).toEqual(true);
      expect(shallow(<UsersAdmin />).text()).toMatch(/Manage Users/);
    });

    it('calls componentDidMount', () => {
      sinon.spy(UsersAdmin.prototype, 'componentDidMount');
      mount(<UsersAdmin />); // Mount the component
      expect(UsersAdmin.prototype.componentDidMount.called).toBe(true);
      UsersAdmin.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', () => {
      sinon.spy(UsersAdmin.prototype, 'componentWillUnmount');
      let usersAdmin = mount(<UsersAdmin />); // Mount the component
      usersAdmin.unmount();
      expect(UsersAdmin.prototype.componentWillUnmount.calledOnce).toBe(true);
      UsersAdmin.prototype.componentWillUnmount.restore();
    });
  });

  describe('Class Functions', function() {
    window.Materialize = {};

    var usersAdmin;

    beforeEach(function() {
      sinon.stub(RoleActions, 'getRoles').returns(true);
      sinon.stub(UserActions, 'fetchAllUsers').returns(true);
      sinon.stub(UserActions, 'update').returns(true);
      window.Materialize.toast = sinon.spy();
      usersAdmin = mount(<UsersAdmin />);
    });

    afterEach(function() {
      RoleActions.getRoles.restore();
      UserActions.fetchAllUsers.restore();
      UserActions.update.restore();
      usersAdmin.unmount();
    });

    describe('handleSelectChange', function() {
      it('should correctly update the state', function() {
        let user = {
          _id: 1,
          role: {
            _id: 22
          }
        };
        let val = {
          _id: 1
        };
        const instance = usersAdmin.instance();
        sinon.spy(instance, 'handleSelectChange');
        instance.handleSelectChange(user, val);
        expect(usersAdmin.state()[user._id]).toBe(val);
        instance.handleSelectChange.restore();
      });
    });

    describe('handleRolesResult', function() {
      it('should correctly update the state', function() {
        let val = [{
          _id: 1
        }];
        RoleStore.setRoles(val);
        expect(RoleStore.getRoles()).toEqual(val);
        expect(usersAdmin.state().roles).toBe(val);
      });
    });

    describe('handleUsersResult', function() {
      it('should correctly update the state', function() {
        let users = [{
          _id: 1,
          name: {
            first: 'Kevin',
            last: 'wknflfwe'
          },
          role: {
            title: 'viewer'
          }
        }];
        UserStore.setUsers(users);
        expect(UserStore.getUsers()).toBe(users);
        expect(usersAdmin.state().users).toBe(users);
      });
    });

  });
});
