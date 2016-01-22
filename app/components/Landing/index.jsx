(function() {
  'use strict';
  let React = require('react');
  let NavBar = require('./NavBar.jsx');
  let Main = require('./Main.jsx');

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
          <NavBar/>
          <Main/>
        </div>
      );
    }
  }

  module.exports = Landing;
})();
