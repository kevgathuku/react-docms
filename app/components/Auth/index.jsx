(() => {
  'use strict';

  let React = require('react'),
      Login = require('../Login/index.jsx'),
      SignUp = require('../SignUp/index.jsx');

  class Authenticate extends React.Component {

    render() {
      return (
        <div className="container">
          <br />
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
              <SignUp />
            </div>
            <div id="login">
              <Login />
            </div>
          </div>
        </div>
      );
    }
  }

  module.exports = Authenticate;

})();
