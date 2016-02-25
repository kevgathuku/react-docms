'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
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
});
