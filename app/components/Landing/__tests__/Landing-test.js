(() => {
  'use strict';

  jest.dontMock('../index.jsx');

  let React = require('react');
  let ReactDOM = require('react-dom');
  let TestUtils = require('react-addons-test-utils');
  let Landing = require('../index.jsx');

  describe('Landing', () => {
    // Render the Landing Page in the document
    let landing = TestUtils.renderIntoDocument(<Landing />);

    it('renders the Landing component', () => {
      let heading = TestUtils.findRenderedDOMComponentWithTag(landing, 'h1');
      let headingNode = ReactDOM.findDOMNode(heading);

      // Check whether we have the right content
      expect(headingNode.textContent)
      .toMatch(/Docue\s+is the simplest way for anyone to manage their documents online/);
    });

    it('renders the Get Started button', () => {
      let button = TestUtils.findRenderedDOMComponentWithTag(landing, 'a');
      let buttonNode = ReactDOM.findDOMNode(button);

      expect(buttonNode.textContent).toEqual('Get Started');
    });

  });
})();
