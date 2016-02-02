(() => {
  'use strict';

  let React = require('react');

  class Dashboard extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <div className="container">
            <p> Dashboard Component </p>
          </div>
        </div>
      );
    }
  }

  module.exports = Dashboard;

})();
