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
        loggedIn: null,
        user: null
      };
      this.userSession = this.userSession.bind(this);
      this.handleLogoutResult = this.handleLogoutResult.bind(this);
      this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
    }

    componentWillMount() {
      // Get the token from localStorage
      let token = localStorage.getItem('user');
      // Send a request to check if the user is logged in
      UserActions.getSession(token);
      UserStore.addChangeListener(this.userSession);
      UserStore.addChangeListener(this.handleLogoutResult);
    }

    userSession() {
      // Returns 'true' + the user object or 'false'
      let response = UserStore.getSession();
      this.setState({loggedIn: response.loggedIn});
      if (response && !response.error) {
        if (response.loggedIn === 'false') {
          // If there is a user token in localStorage, remove it
          // because it is invalid now
          localStorage.removeItem('user');
          // If the user is not logged in and is not on the homepage
          // redirect them to the login page
          if (window.location.pathname !== '/') {
            browserHistory.push('/auth');
          }
        } else if (response.loggedIn === 'true') {
          this.setState({
            loggedIn: response.loggedIn,
            user: response.user
          });
          if (window.location.pathname == '/auth') {
            browserHistory.push('/dashboard');
          }
        }
      }
    }

    handleLogoutSubmit(event) {
      event.preventDefault();
      // Get the token from localStorage
      let token = localStorage.getItem('user');
      // Send a request to check if the user is logged in
      UserActions.logout({}, token);
    }

    handleLogoutResult() {
      var data = UserStore.getLogoutResult();
      if (data && !data.error) {
        // If the logout is successful
        window.Materialize.toast(data.message, 2000, 'success-toast');
        browserHistory.push('/');
        // Remove the user's token
        localStorage.removeItem('user');
        // Set the state to update the navbar links
        this.setState({
          loggedIn: null,
          user: null
        });
      }
    }

    render() {
      return (
        <nav className="transparent black-text" role="navigation">
          <div className="nav-wrapper container">
            <a className="brand-logo brand-logo-small" href="/">
              <img alt="Docue Logo" id="header-logo" src={logoSrc}/>
              {'      Docue'}</a>
            <ul className="right hide-on-med-and-down" id="nav-mobile">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                {this.state.loggedIn === 'true'
                  ? <a href="#" onClick={this.handleLogoutSubmit}>Logout</a>
                  : <a href="/auth">Login</a>
                }
              </li>
            </ul>
            <div className="row center hide-on-large-only" id="header-mobile-links">
              <div className="col s4">
                <a href="/">Home</a>
              </div>
              <div className="col s4">
                <a href="/#">About</a>
              </div>
              <div className="col s4">
                {this.state.loggedIn === 'true'
                  ? <a href="#" onClick={this.handleLogoutSubmit}>Logout</a>
                  : <a href="/auth">Login</a>
                }
              </div>
              <div className="col s12 spacer"></div>
            </div>
          </div>
        </nav>
      );
    }
  }

  module.exports = NavBar;

}
