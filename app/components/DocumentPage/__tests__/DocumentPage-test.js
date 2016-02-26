'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { browserHistory } from 'react-router';
import DocStore from '../../../stores/DocStore';
import DocumentPage from '../index.jsx';

describe('DocumentPage', function() {

  describe('Component Rendering', function() {
    it('renders the correct component', function() {
      expect(shallow(<DocumentPage  params={{id: 4}} />).is('.container')).toEqual(true);
      expect(shallow(<DocumentPage  params={{id: 4}} />).find('.fixed-action-btn').length).toEqual(1);
    });

    it('calls componentDidMount', () => {
      sinon.spy(DocumentPage.prototype, 'componentDidMount');
      mount(<DocumentPage params={{id: 4}} />); // Mount the component
      expect(DocumentPage.prototype.componentDidMount.called).toBe(true);
      DocumentPage.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', () => {
      sinon.spy(DocumentPage.prototype, 'componentWillUnmount');
      let documentPage = mount(<DocumentPage params={{id: 4}} />); // Mount the component
      documentPage.unmount();
      expect(DocumentPage.prototype.componentWillUnmount.calledOnce).toBe(true);
      DocumentPage.prototype.componentWillUnmount.restore();
    });
  });

  describe('Component Functions', function() {
    window.Materialize = {};

    var docPage;

    beforeEach(function() {
      window.Materialize.toast = sinon.spy();
      docPage = mount(<DocumentPage params={{id: 4}}/>);
    });

    afterEach(function() {
      docPage.unmount();
    });

    describe('handleDocumentFetch', function() {
      it('should correctly handle document fetch', function() {
        sinon.spy(DocStore, 'getDoc');
        let result = {
          data: {
            content: 'Hello from the other side',
            dateCreated: '2016-02-15T15:10:34.000Z',
            ownerId: {
              _id: 3,
              name: {
                first: 'Kevin',
                last: 'wkejbfekjwbf'
              }
            }
          }
        };
        DocStore.setDoc(result);
        // Should set the state correctly
        expect(DocStore.getDoc.called).toBe(true);
        expect(docPage.state().doc).toBe(result.data);
        // Ensure the content is displayed
        expect(docPage.find('div.col.s10.offset-s1').text())
          .toInclude(result.data.content);
        DocStore.getDoc.restore();
      });
    });

    describe('handleDeleteResult', function() {
      it('should set state correctly on doc fetch', function() {
        window.swal = sinon.spy();
        sinon.spy(DocStore, 'getDocDeleteResult');
        sinon.spy(browserHistory, 'push');
        let result = {
          statusCode: 204
        };
        DocStore.setDocDeleteResult(result);
        // Should respond correctly
        expect(DocStore.getDocDeleteResult.called).toBe(true);
        expect(window.swal.withArgs('Deleted!').called).toBe(true);
        expect(browserHistory.push.withArgs('/dashboard').called).toBe(true);
        DocStore.getDocDeleteResult.restore();
        browserHistory.push.restore();
      });
    });

    describe('onEditUpdate', function() {
      let doc = {
        content: 'Hello from the other side',
        dateCreated: '2016-02-15T15:10:34.000Z',
        ownerId: {
          _id: 3,
          name: {
            first: 'Kevin',
            last: 'wkejbfekjwbf'
          }
        }
      };
      it('should correctly update the state', function() {
        const instance = docPage.instance();
        sinon.spy(instance, 'onEditUpdate');
        instance.onEditUpdate(doc);
        expect(docPage.state().doc).toBe(doc);
        instance.onEditUpdate.restore();
      });
    });

  });
});
