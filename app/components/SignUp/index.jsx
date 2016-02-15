(function() {
  'use strict';

  let React = require('react'),
    UserActions = require('../../actions/UserActions'),
    browserHistory = require('react-router').browserHistory,
    UserStore = require('../../stores/UserStore');

  class SignupForm extends React.Component {

    constructor() {
      super();
      this.state = {
        username: null,
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        passwordConfirm: null,
        result: null
      };
      // React components using ES6 classes no longer
      // autobind this to non React methods.
      // This is required in the constructor
      // to make 'this' available to non React methods
      this.comparePassword = this.comparePassword.bind(this);
      this.handleFieldChange = this.handleFieldChange.bind(this);
      this.handleSignup = this.handleSignup.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      UserStore.addChangeListener(this.handleSignup, 'signup');
    }

    comparePassword(password, confirmPassword) {
      if (password !== confirmPassword) {
        window.Materialize.toast('passwords don\'t match', 2000, 'error-toast');
        return false;
      } else if (password.length >= 1 && password.length < 6) {
        window.Materialize.toast('passwords should be > 6 characters ', 2000, 'error-toast');
        return false;
      } else {
        return true;
      }
    }

    handleSignup() {
      var data = UserStore.getSignupResult();
      if (data) {
        if (data.error) {
          window.Materialize.toast(data.error, 2000, 'error-toast');
        } else {
          // The signup was successful. Save user's info in localStorage
          localStorage.setItem('user', data.token);
          localStorage.setItem('userInfo', JSON.stringify(data.user));
          window.Materialize.toast('Your Account has been created successfully!', 2000, 'success-toast');
          browserHistory.push('/dashboard');
        }
      }
    }

    handleSubmit(event) {
      event.preventDefault();
      if (this.comparePassword(this.state.password, this.state.passwordConfirm)) {
        let userPayload = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          username: this.state.email,
          email: this.state.email,
          password: this.state.password
        };
        UserActions.signup(userPayload);
      }
    }

    handleFieldChange(event) {
      if (event.target.name === 'password-confirm') {
        this.setState({passwordConfirm: event.target.value});
      } else {
        // A function bound to the event object
        let stateObject = function() {
          let returnObj = {};
          returnObj[this.target.name] = this.target.value;
          return returnObj;
        }.bind(event)();

        this.setState(stateObject);
      }
    }

    render() {
      return (
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="input-field col m6 s12">
              <input className="validate" id="firstname" name="firstname" onChange={this.handleFieldChange} required type="text"/>
              <label htmlFor="firstname">First Name</label>
            </div>
            <div className="input-field col m6 s12">
              <input className="validate" id="lastname" name="lastname" onChange={this.handleFieldChange} required type="text"/>
              <label htmlFor="lastname">Last Name</label>
            </div>
            <div className="input-field col s12">
              <input className="validate" id="email" name="email" onChange={this.handleFieldChange} required type="email"/>
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input className="validate" id="password" name="password" onChange={this.handleFieldChange} required type="password"/>
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field col s12">
              <input className="validate" id="password-confirm" name="password-confirm" onChange={this.handleFieldChange} required type="password"/>
              <label htmlFor="password-confirm">Confirm Password</label>
            </div>
            <div className="col s12">
              <div className="center">
                <button className="btn waves-effect waves-light blue" name="action" type="submit">
                  Sign up
                </button>
            </div>
            </div>
          </form>
        </div>
      );
    }
  }

  module.exports = SignupForm;
})();
