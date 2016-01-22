(function() {
  'use strict';
  let React = require('react');
  let NavBar = require('./NavBar.jsx');
  let Main = require('./Main.jsx');


  class Landing extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div>
          <NavBar />
          <Main />
        </div>
      );
    }
  }

  module.exports = Landing;
})();
