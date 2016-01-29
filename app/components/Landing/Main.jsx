(function() {
  'use strict';
  let React = require('react'),
    NavBar = require('../NavBar/index.jsx');

  class Main extends React.Component {

    constructor(props) {
      super(props);
    }


    render() {
      return (
        <div>
          <NavBar />
          {this.props.children}
        </div>
      );
    }
  }

  module.exports = Main;
})();
