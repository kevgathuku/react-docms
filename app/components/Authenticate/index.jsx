(() => {
  'use strict';

  var React = require('react');

  class Authenticate extends React.Component {

    render() {
      return (
        <div className="container">
          <div className="card-panel signupcard col s6">
            <div className="col s8">
              <ul className="tabs">
                <li className="tab col s4">
                  <a className="active" href="#login">login</a>
                </li>
                <li className="tab col s4">
                  <a className="active" href="#signup">signup</a>
                </li>
              </ul>
            </div>
            <div id="signup">
              <p> Signup Form Should Be Here </p>
            </div>
            <div id="login">
              <p> Login Form Should Be Here </p>
            </div>
          </div>
        </div>
      );
    }
  }

  module.exports = Authenticate;

})();
