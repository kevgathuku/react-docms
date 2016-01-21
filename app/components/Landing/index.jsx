(function() {
  'use strict';
  var React = require('react');
  var NavBar = require('./NavBar.jsx');

  class Landing extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div>
          <NavBar />
        </div>
      );
    }
  }

  module.exports = Landing;
})();
