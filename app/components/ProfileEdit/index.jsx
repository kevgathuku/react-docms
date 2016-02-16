(function() {
  'use strict';

  let React = require('react'),
    UserActions = require('../../actions/UserActions'),
    UserStore = require('../../stores/UserStore');

  class ProfileEdit extends React.Component {

    constructor() {
      super();
      let user = JSON.parse(localStorage.getItem('userInfo'));
      this.state = {
        token: localStorage.getItem('user'),
        user: user,
        firstname: user.name.first,
        lastname: user.name.last,
        email: user.email,
        password: null,
        passwordConfirm: null
      };
    }

    componentDidMount() {
      UserStore.addChangeListener(this.handleEditResult, 'update');
    }

    componentWillUnmount() {
      UserStore.removeChangeListener(this.handleEditResult, 'update');
    }

    comparePassword = (password, confirmPassword) => {
      if (password && confirmPassword) {
        if (password !== confirmPassword) {
          window.Materialize.toast('Passwords don\'t match', 2000, 'error-toast');
          return false;
        } else if (password.length >= 1 && password.length < 6) {
          window.Materialize.toast('Passwords should be > 6 characters ', 2000, 'error-toast');
          return false;
        } else {
          return true;
        }
      }
    }

    handleFieldChange = (event) => {
      if (event.target.name === 'confirm-password') {
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

    handleSubmit = (event) => {
      event.preventDefault();
      if (this.state.password && this.state.confirmPassword) {
        if (this.comparePassword(this.state.password, this.state.passwordConfirm)) {
          let userPayload = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
          };
          UserActions.update(this.state.user._id, userPayload, this.state.token);
        }
      } else {
        let userPayload = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email
        };
        UserActions.update(this.state.user._id, userPayload, this.state.token);
      }
    }

    handleEditResult = () => {
      let result = UserStore.getUpdateResult();
      if (result) {
        if (!result.error) {
          localStorage.setItem('userInfo', JSON.stringify(result));
          window.Materialize.toast('Profile Updated!', 3000, 'success-toast');
        } else {
          window.Materialize.toast(result.error, 2000, 'error-toast');
        }
      }
    }

    render() {
      return (
        <div className="container">
          <div className="card-panel">
            <div className="row">
              <h2 className="header center-align">My Profile</h2>
            </div>
              <form className="col s10 offset-s1">
                <div className="row">
                  <div className="col s4 offset-s4">
                    <label htmlFor="email">Email</label>
                    <input id="email"
                        name="email"
                        defaultValue={this.state.user.email}
                        onChange={this.handleFieldChange}
                        type="text"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s4 offset-s4">
                    <label htmlFor="firstname">First Name</label>
                    <input id="firstname"
                        name="firstname"
                        defaultValue={this.state.user.name.first}
                        onChange={this.handleFieldChange}
                        type="text"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s4 offset-s4">
                    <label htmlFor="lastname">Last Name</label>
                    <input id="lastname"
                        name="lastname"
                        defaultValue={this.state.user.name.last}
                        onChange={this.handleFieldChange}
                        type="text"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s4 offset-s4">
                    <label htmlFor="password">New Password</label>
                    <input id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleFieldChange}
                        type="password"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s4 offset-s4">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input id="confirm-password"
                        name="confirm-password"
                        value={this.state.passwordConfirm}
                        onChange={this.handleFieldChange}
                        type="password"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s2 offset-s4">
                    <button className="btn waves-effect red accent-2 center">
                      cancel
                    </button>
                  </div>
                  <div className="col s2">
                    <button className="btn waves-effect blue center"
                        onClick={this.handleSubmit}
                    >
                      update
                    </button>
                  </div>
                </div>
              </form>
            </div>
        </div>
      );
    }
  }

  module.exports = ProfileEdit;

})();
