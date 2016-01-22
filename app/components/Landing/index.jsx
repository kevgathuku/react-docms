(function() {
  'use strict';
  let React = require('react');
  let Home = require('./Home.jsx');

  // Requires the CSS for it to be included in the final output
  // This specific CSS is required for the landing page only
  require('../../styles/style.css');

  class Landing extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div>
          <Home/>
        </div>
      );
    }
  }

  module.exports = Landing;
})();
