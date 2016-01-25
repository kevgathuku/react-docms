(() => {
  'use strict';

  let React = require('react'),
      Login = require('../Login/index.jsx'),
      SignUp = require('../SignUp/index.jsx');

  class Authenticate extends React.Component {

    render() {
      return (
        <div className="container">
          <br/>
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="container">
                  <div className="row card-panel hoverable">
                    <div className="col s12">
                      <ul className="tabs">
                        <li className="tab col s4"><a className="active blue-text" href="/auth#login">Login</a></li>
                        <li className="tab col s4"><a className="blue-text" href="/auth#signup">Signup</a></li>
                      </ul>
                    </div>
                    <div id="login" className="col s12">
                     <Login />
                    </div>
                    <div id="signup" className="col s12">
                      <SignUp />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  module.exports = Authenticate;

})();
