'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Admin from '../index.jsx';

describe('Admin', function() {

  describe('Component Rendering', function() {
    it('displays the correct contents', function() {
      // It should find the correct content
      expect(shallow(<Admin />).text()).toMatch(/Admin\s+Panel/);
      expect(shallow(<Admin />).text()).toMatch(/Manage\s+Users/);
    });

    it('renders the correct component', function() {
      expect(shallow(<Admin />).is('.container')).toEqual(true);
      expect(shallow(<Admin />).find('.flow-text').length).toEqual(3);
    });

    it('calls componentDidMount', () => {
      sinon.spy(Admin.prototype, 'componentDidMount');
      mount(<Admin />); // Mount the component
      expect(Admin.prototype.componentDidMount.called).toBe(true);
      Admin.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', () => {
      sinon.spy(Admin.prototype, 'componentWillUnmount');
      let admin = mount(<Admin />); // Mount the component
      admin.unmount();
      expect(Admin.prototype.componentWillUnmount.calledOnce).toBe(true);
      Admin.prototype.componentWillUnmount.restore();
    });

  });
});
