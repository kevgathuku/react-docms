(function() {
  'use strict';
  let React = require('react');
  let NavBar = require('../NavBar/index.jsx');

  class Main extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div>
          <NavBar/>
          {this.props.children}
        </div>
      );
    }
  }

  module.exports = Main;
})();
