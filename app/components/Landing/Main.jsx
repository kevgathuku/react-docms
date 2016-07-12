{
  'use strict';

  let React = require('react'),
    NavBar = require('../NavBar/index.jsx');

  class Main extends React.Component {
    static propTypes = {
      children: React.PropTypes.element.isRequired,
      location: React.PropTypes.object
    };

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <NavBar pathname={this.props.location.pathname}/>
          {this.props.children}
        </div>
      );
    }
  }

  module.exports = Main;

}
