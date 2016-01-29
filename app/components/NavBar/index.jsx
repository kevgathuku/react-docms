(() => {
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
      // Returns 'true' or 'false'
      let response = UserStore.getSession();
      if (response && !response.error) {
        this.setState({loggedIn: response.loggedIn});
        if (response.loggedIn === 'false') {
          // If th user is not logged in and is not on the homepage
          // Redirect them to the login page
          if (window.location.pathname !== '/') {
            browserHistory.push('/auth');
          }
        } else if (response.loggedIn === 'true') {
          if (window.location.pathname == '/auth') {
            browserHistory.push('/dashboard');
          }
        }
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
                <a href="/auth">Login</a>
              </li>
            </ul>
            <div className="row center hide-on-large-only" id="header-mobile-links">
              <div className="col s4">
                <a href="/#">Home</a>
              </div>
              <div className="col s4">
                <a href="/#">About</a>
              </div>
              <div className="col s4">
                <a href="#">Login</a>
              </div>
              <div className="col s12 spacer"></div>
            </div>
          </div>
        </nav>
      );
    }
  }

  module.exports = NavBar;

})();
