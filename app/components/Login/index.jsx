(function() {
  'use strict';

  let React = require('react'),
    UserActions = require('../../actions/UserActions'),
    browserHistory = require('react-router').browserHistory,
    UserStore = require('../../stores/UserStore');

  class LoginForm extends React.Component {
    constructor() {
      super();
      this.state = {
        email: null,
        password: null,
        result: null
      };

      this.handleFieldChange = this.handleFieldChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      UserStore.addChangeListener(this.handleLogin);
    }

    handleLogin() {
      var data = UserStore.getLoginResult();
      if (data) {
        if (data.error) {
          window.Materialize.toast(data.error, 2000, 'error-toast');
        } else {
        // The login was successful
        localStorage.setItem('user', data.token);
        window.Materialize.toast('Logged in Successfully!', 2000, 'success-toast');
        browserHistory.push('/dashboard');
        }
      }
    }

    handleFieldChange(event) {
      // A function bound to the event object
      let stateObject = function() {
        let returnObj = {};
        returnObj[this.target.name] = this.target.value;
        return returnObj;
      }.bind(event)();

      this.setState(stateObject);
    }

    handleSubmit(event) {
      event.preventDefault();
        let loginPayload = {
          username: this.state.email,
          password: this.state.password
        };
        UserActions.login(loginPayload);
    }

    render() {
      return (
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="input-field col s12">
              <input className="validate"
                  id="email"
                  name="email"
                  onChange={this.handleFieldChange}
                  required
                  type="text"
              />
            <label htmlFor="email">Email Address</label>
            </div>
            <div className="input-field col s12">
              <input className="validate"
                  id="password"
                  name="password"
                  onChange={this.handleFieldChange}
                  required
                  type="password"
              />
            <label htmlFor="password">Password</label>
            </div>
            <div className="col s12">
              <div className="containter center">
                <button className="btn waves-effect header-btn blue"
                    name="action"
                    type="submit"
                > Login
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }

  module.exports = LoginForm;
})();
