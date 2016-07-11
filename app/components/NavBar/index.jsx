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
      UserStore.addChangeListener(this.userSession, 'session');
      UserStore.addChangeListener(this.afterLoginUpdate, 'login');
      UserStore.addChangeListener(this.afterSignupUpdate, 'signup');
      UserStore.addChangeListener(this.handleLogoutResult);
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        window.$('.dropdown-button').dropdown();
        window.$('.button-collapse').sideNav();
      }
    }

    componentDidUpdate() {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        window.$('.dropdown-button').dropdown();
        window.$('.button-collapse').sideNav();
      }
    }

    componentWillUnmount() {
      UserStore.removeChangeListener(this.userSession, 'session');
      UserStore.removeChangeListener(this.afterLoginUpdate, 'login');
      UserStore.removeChangeListener(this.afterSignupUpdate, 'signup');
      UserStore.removeChangeListener(this.handleLogoutResult);
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
          if (window.location.pathname === '/auth' || window.location.pathname === '/') {
            browserHistory.push('/dashboard');
          }
        }
      }
    };

    handleLogoutSubmit = (event) => {
      event.preventDefault();
      // Send a request to check if the user is logged in
      UserActions.logout({}, this.state.token);
    };

    handleLogoutResult = () => {
      let data = UserStore.getLogoutResult();
      if (data && !data.error) {
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
            <a href="#" data-activates="mobile-demo" className="button-collapse">
              <i className="material-icons" style={{color: 'grey'}}>menu</i>
            </a>
            <ul className="side-nav" id="mobile-demo">
              <li><a href="/">Home</a></li>
              <li>
                {this.state.loggedIn === 'true'
                  ? <a href="/profile" >Profile</a>
                  : <a href="/auth">Login</a>
                }
              </li>
              <li>
                {this.state.loggedIn === 'true'
                  ? <a href="/#" onClick={this.handleLogoutSubmit}>Logout</a>
                  : <a href="/auth">Sign Up</a>
                }
              </li>
            </ul>
            <ul className="right hide-on-med-and-down" id="nav-mobile">
              <li>
                {this.state.loggedIn === 'true'
                  ? <div>
                      <ul id="dropdown" className="dropdown-content">
                        <li><a href="/profile">My Profile</a></li>
                        <li><a href="/dashboard">All Documents</a></li>
                        {
                          this.state.user.role.title == 'admin'
                          ? <li><a href="/admin">Settings</a></li>
                          : null
                        }
                        <li className="divider"></li>
                        <li>
                          <a href="/#" id="logout-btn"
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
          </div>
        </nav>
      );
    }
  }

  module.exports = NavBar;

}
