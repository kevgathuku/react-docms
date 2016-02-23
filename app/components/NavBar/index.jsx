{
  'use strict';

  let React = require('react'),
      UserActions = require('../../actions/UserActions'),
      browserHistory = require('react-router').browserHistory,
      UserStore = require('../../stores/UserStore'),
      logoSrc = require('../../images/favicon.png');

  class NavBar extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        token: localStorage.getItem('user'),
        loggedIn: null,
        user: null
      };
    }

    componentDidMount() {
      // Send a request to check if the user is logged in
      UserActions.getSession(this.state.token);
      UserStore.addChangeListener(this.userSession);
      UserStore.addChangeListener(this.afterLoginUpdate, 'login');
      UserStore.addChangeListener(this.afterSignupUpdate, 'signup');
      UserStore.addChangeListener(this.handleLogoutResult);
      setTimeout(() => {
        window.$('.dropdown-button').dropdown();
      }, 1000);
    }

    componentDidUpdate() {
      setTimeout(() => {
        window.$('.dropdown-button').dropdown();
      }, 1000);
    }

    afterLoginUpdate = () => {
      // Update the state after a user login event
      let data = UserStore.getLoginResult();
      if (data && !data.error) {
        this.setState({
          loggedIn: 'true',
          token: data.token,
          user: data.user
        });
      }
    };

    afterSignupUpdate = () => {
      // Update the state after a user signs up
      let data = UserStore.getSignupResult();
      if (data && !data.error) {
        this.setState({
          loggedIn: 'true',
          token: data.token,
          user: data.user
        });
      }
    };

    userSession = () => {
      // Returns 'true' + the user object or 'false'
      let response = UserStore.getSession();
      if (response && !response.error) {
        this.setState({
          loggedIn: response.loggedIn,
          user: response.user
        });
        if (response.loggedIn === 'false') {
          // If there is a user token in localStorage, remove it
          // because it is invalid now
          localStorage.removeItem('user');
          localStorage.removeItem('userInfo');
          // If the user is not logged in and is not on the homepage
          // redirect them to the login page
          if (window.location.pathname !== '/') {
            browserHistory.push('/auth');
          }
        } else if (response.loggedIn === 'true') {
          if (window.location.pathname == '/auth' || window.location.pathname === '/') {
            browserHistory.push('/dashboard');
          }
        }
      }
    };

    handleDropdownClick = (event) => {
      event.preventDefault();
      window.$('.dropdown-button').dropdown();
    };

    handleLogoutSubmit = (event) => {
      event.preventDefault();
      // Send a request to check if the user is logged in
      UserActions.logout({}, this.state.token);
    };

    handleLogoutResult = () => {
      let data = UserStore.getLogoutResult();
      if (data && !data.error) {
        // If the logout is successful
        window.Materialize.toast(data.message, 2000, 'success-toast');
        // Remove the user's token and info
        localStorage.removeItem('user');
        localStorage.removeItem('userInfo');
        // Set the state to update the navbar links
        this.setState({
          loggedIn: null,
          user: null
        });
        browserHistory.push('/');
      }
    };

    render() {
      return (
        <nav className="transparent black-text" role="navigation">
          <div className="nav-wrapper container">
            <a className="brand-logo brand-logo-small" href="/">
              <img alt="Docue Logo" id="header-logo" src={logoSrc}/>
              {'      Docue'}
            </a>
            <ul className="right hide-on-med-and-down" id="nav-mobile">
              <li>
                {this.state.loggedIn === 'true'
                  ? <div>
                      <ul id="dropdown" className="dropdown-content">
                        <li><a href="/profile">My Profile</a></li>
                        <li><a href="/dashboard">My Documents</a></li>
                        {
                          this.state.user.role.title == 'admin'
                          ? <li><a href="/admin">Settings</a></li>
                          : null
                        }
                        <li className="divider"></li>
                        <li>
                          <a href="/#"
                              onClick={this.handleLogoutSubmit}
                          > Logout
                          </a>
                        </li>
                      </ul>
                      <a className="dropdown-button"
                          data-activates="dropdown"
                          data-beloworigin="true"
                          data-constrainwidth="false"
                      >{this.state.user.name.first}
                        <i className="material-icons right">arrow_drop_down</i>
                      </a>
                    </div>
                  : null
                }
              </li>
            </ul>
            { // Don't display the menu on the login page
              window.location.pathname !== '/auth'
              ?
              <div className="row center hide-on-large-only" id="header-mobile-links" style={{top: 52}}>
                <div className="col s4">
                  <a href="/">Home</a>
                </div>
                <div className="col s4">
                  {this.state.loggedIn === 'true'
                    ? <a href="/profile" >Profile</a>
                    : <a href="/auth">Login</a>
                  }
                </div>
                <div className="col s4">
                  {this.state.loggedIn === 'true'
                    ? <a href="/#" onClick={this.handleLogoutSubmit}>Logout</a>
                  : <a href="/auth">Sign Up</a>
                  }
                </div>
                <div className="col s12 spacer"></div>
              </div>
            : null
          }
          </div>
        </nav>
      );
    }
  }

  module.exports = NavBar;

}
