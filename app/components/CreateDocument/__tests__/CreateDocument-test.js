'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import CreateDocument from '../index.jsx';

describe('CreateDocument', function() {

  describe('Component Rendering', function() {
    it('displays the correct contents', function() {
      // It should find the correct content
      expect(shallow(<CreateDocument />).text()).toMatch(/Create\s+Document/);
    });

    it('renders the correct component', function() {
      expect(shallow(<CreateDocument />).is('.container')).toEqual(true);
      expect(shallow(<CreateDocument />).find('.input-field').length).toEqual(3);
    });

    it('calls componentDidMount', () => {
      sinon.spy(CreateDocument.prototype, 'componentDidMount');
      mount(<CreateDocument />); // Mount the component
      expect(CreateDocument.prototype.componentDidMount.called).toBe(true);
      CreateDocument.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', () => {
      sinon.spy(CreateDocument.prototype, 'componentWillUnmount');
      let createDoc = mount(<CreateDocument />); // Mount the component
      createDoc.unmount();
      expect(CreateDocument.prototype.componentWillUnmount.calledOnce).toBe(true);
      CreateDocument.prototype.componentWillUnmount.restore();
    });

  });
});
