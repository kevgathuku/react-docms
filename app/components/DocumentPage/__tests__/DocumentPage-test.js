'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
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
});
