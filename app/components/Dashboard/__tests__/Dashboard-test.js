'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Dashboard from '../index.jsx';

describe('Dashboard', function() {

  describe('Component Rendering', function() {
    it('displays the correct contents', function() {
      // It should find the correct content
      expect(shallow(<Dashboard />).text()).toMatch(/All\s+Documents/);
    });

    it('renders the correct component', function() {
      expect(shallow(<Dashboard />).is('.container')).toEqual(true);
      expect(shallow(<Dashboard />).find('.fixed-action-btn').length).toEqual(1);
    });

    it('calls componentDidMount', () => {
      sinon.spy(Dashboard.prototype, 'componentDidMount');
      mount(<Dashboard />); // Mount the component
      expect(Dashboard.prototype.componentDidMount.called).toBe(true);
      Dashboard.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', () => {
      sinon.spy(Dashboard.prototype, 'componentWillUnmount');
      let dash = mount(<Dashboard />); // Mount the component
      dash.unmount();
      expect(Dashboard.prototype.componentWillUnmount.calledOnce).toBe(true);
      Dashboard.prototype.componentWillUnmount.restore();
    });

  });
});
