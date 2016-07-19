'use strict';

import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import DocList from '../DocList';
import sinon from 'sinon';

describe('DocList', function() {

  describe('Component Rendering', function() {
    var docList;

    before(function() {
      window.$ = sinon.stub();

      window.$.withArgs('.tooltipped').returns(sinon.stub({
        tooltip: function() {}
      }));
      this.docs = [
        {
          _id: 2,
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
      ];
      docList = mount(<DocList docs={this.docs}/>);
    });

    after(function() {
      docList.unmount();
    });

    it('displays the correct contents', function() {
      // It should find the correct content
      expect(docList.text()).toInclude(this.docs[0].ownerId.name.first);
    });

    it('should activate the materialize tooltips', function() {
      // The tooltips should be activated once after the component is mounted
      expect(window.$.withArgs('.tooltipped').calledOnce).toBe(true);
    });

    it('renders the correct component', function() {
      expect(docList.find('.card-image').length).toEqual(this.docs.length);
      expect(docList.find('.btn-floating').length).toEqual(this.docs.length);
    });

  });
});
