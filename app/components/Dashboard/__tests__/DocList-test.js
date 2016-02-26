'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import DocList from '../DocList.jsx';

describe('DocList', function() {

  describe('Component Rendering', function() {
    var docList;

    beforeEach(function() {
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

    afterEach(function() {
      docList.unmount();
    });

    it('displays the correct contents', function() {
      // It should find the correct content
      expect(docList.text()).toInclude(this.docs[0].ownerId.name.first);
    });

    it('renders the correct component', function() {
      expect(docList.find('.card-image').length).toEqual(this.docs.length);
      expect(docList.find('.btn-floating').length).toEqual(this.docs.length);
    });

    it('calls componentDidMount', () => {
      let docs  = [
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
      sinon.spy(DocList.prototype, 'componentDidMount');
      mount(<DocList docs={docs}/>);
      expect(DocList.prototype.componentDidMount.called).toBe(true);
      DocList.prototype.componentDidMount.restore();
    });

  });
});
