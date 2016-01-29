(() => {
  'use strict';

  let React = require('react'),
      SideNav = require('../SideNav/index.jsx');

  class Dashboard extends React.Component {
    constructor(props) {
      super(props);

    }

    render() {
      return (
        <div className="container">
          <SideNav />
          <p> Dashboard Component </p>
        </div>
      );
    }
  }

  module.exports = Dashboard;

})();
