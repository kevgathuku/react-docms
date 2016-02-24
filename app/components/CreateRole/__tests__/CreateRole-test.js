'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
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
});
