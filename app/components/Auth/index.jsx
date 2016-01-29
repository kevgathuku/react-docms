(() => {
  'use strict';

  let React = require('react'),
      UserActions = require('../../actions/UserActions'),
      browserHistory = require('react-router').browserHistory,
      UserStore = require('../../stores/UserStore'),
      Login = require('../Login/index.jsx'),
      SignUp = require('../SignUp/index.jsx');

  class Authenticate extends React.Component {
    constructor() {
      super();

      this.state = {
        loggedIn: null
      };

      this.userSession = this.userSession.bind(this);
    }

  componentWillMount() {
    // Get the token from localStorage
    let token = localStorage.getItem('user');
    // Send a request to check if the user is logged in
    UserActions.getSession(token);
    UserStore.addChangeListener(this.userSession);
  }

  userSession() {
    let response = UserStore.getSession();
    // If the user is logged in, redirect to the homepage
    if (response && !response.error) {
      this.setState({
        loggedIn: response.loggedIn
      });
      if (response.loggedIn === 'true') {
        browserHistory.push('/');
      }
    }
  }

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
                        <li className="tab col s4"><a className="active blue-text" href="#login">Login</a></li>
                        <li className="tab col s4"><a className="blue-text" href="#signup">Signup</a></li>
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
