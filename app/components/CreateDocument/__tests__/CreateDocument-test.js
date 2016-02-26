'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { browserHistory } from 'react-router';
import DocActions from '../../../actions/DocActions';
import DocStore from '../../../stores/DocStore';
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

  describe('Class Functions', function() {
    window.Materialize = {};

    var createDoc;

    beforeEach(function() {
      window.Materialize.toast = sinon.spy();
      createDoc = mount(<CreateDocument />);
    });

    afterEach(function() {
      createDoc.unmount();
    });

    describe('handleDocumentCreateResult', function() {
      it('should correctly handle document creation', function() {
        sinon.spy(browserHistory, 'push');
        DocStore.setDocCreateResult({
          doc: {
            title: 'Docue'
          }
        });
        expect(DocStore.getDocCreateResult()).toBeA('object');
        expect(window.Materialize.toast.withArgs('Document created successfully!').called).toBe(true);
        browserHistory.push.restore();
      });

      it('should correctly handle document creation error', function() {
        let errorResponse = {
          error: 'Error Occurred'
        };
        DocStore.setDocCreateResult(errorResponse);
        expect(DocStore.getDocCreateResult()).toBeA('object');
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
        const instance = createDoc.instance();
        sinon.spy(instance, 'handleFieldChange');
        instance.handleFieldChange(fieldChangeEvent);
        expect(createDoc.state()[fieldChangeEvent.target.name]).toBe(fieldChangeEvent.target.value);
        instance.handleFieldChange.restore();
      });
    });

    describe('handleSelectChange', function() {
      it('should correctly update the state', function() {
        const instance = createDoc.instance();
        sinon.spy(instance, 'handleSelectChange');
        instance.handleSelectChange('kjnfewjkf');
        expect(createDoc.state().role).toBe('kjnfewjkf');
        instance.handleSelectChange.restore();
      });
    });

    describe('handleSubmit', function() {
      it('should not submit without a valid role', function() {
        // simulate the submit form event
        let createDocEvent = {
          preventDefault: function() {}
        };
        const instance = createDoc.instance();
        sinon.spy(instance, 'handleSubmit');
        sinon.spy(createDocEvent, 'preventDefault');
        createDoc.setState({
          role: null
        });
        // Submit the form
        createDoc.find('form').simulate('submit', createDocEvent);
        expect(createDocEvent.preventDefault.called).toBe(true);
        expect(instance.handleSubmit.calledOnce).toBe(true);
        expect(window.Materialize.toast.withArgs('Please Select a Role').called).toBe(true);
        instance.handleSubmit.restore();
      });

      it('should successfully submit if the form is valid', function() {
        sinon.stub(DocActions, 'createDoc').returns(true);
        // simulate the submit form event
        let createDocEvent = {
          preventDefault: function() {}
        };
        const instance = createDoc.instance();
        sinon.spy(instance, 'handleSubmit');
        sinon.spy(createDocEvent, 'preventDefault');
        createDoc.setState({
          role: {
            title: 'viewer'
          }
        });
        // Submit the form
        createDoc.find('form').simulate('submit', createDocEvent);
        expect(createDocEvent.preventDefault.called).toBe(true);
        expect(instance.handleSubmit.calledOnce).toBe(true);
        expect(DocActions.createDoc.called).toBe(true);
        instance.handleSubmit.restore();
        DocActions.createDoc.restore();
      });
    });
  });
});
