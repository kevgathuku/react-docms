(() => {
  'use strict';

  let React = require('react'),
    UserActions = require('../../actions/UserActions'),
    UserStore = require('../../stores/UserStore'),
    cardImage = require('../../images/soccer.jpeg');

  class Profile extends React.Component {

    constructor() {
      super();
      let user = JSON.parse(localStorage.getItem('userInfo'));
      this.state = {
        profileDisplay: 'block',
        editDisplay: 'none',
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

    handleEditToggle = (event) => {
      event.preventDefault();
      if (this.state.editDisplay === 'none') {
        this.setState({
          editDisplay: 'block',
          profileDisplay: 'none'
        });
      } else if (this.state.editDisplay === 'block') {
        this.setState({
          editDisplay: 'none',
          profileDisplay: 'block'
        });
      }
    }

    handleEditResult = () => {
      let result = UserStore.getUpdateResult();
      if (result) {
        if (!result.error) {
          // Update the user object in localStorage
          localStorage.setItem('userInfo', JSON.stringify(result));
          // Update the user object in state to trigger a re-render
          this.setState({
            user: JSON.parse(localStorage.getItem('userInfo')),
            editDisplay: 'none',
            profileDisplay: 'block'
          });
          window.Materialize.toast('Profile Updated!', 3000, 'success-toast');
        } else {
          window.Materialize.toast(result.error, 2000, 'error-toast');
        }
      }
    }

    render() {
      let editForm  = (
        <div className="card-panel" style={{display: this.state.editDisplay}}>
          <div className="row">
            <h2 className="header center-align">Edit Profile</h2>
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
                <button className="btn waves-effect red accent-2 center"
                    onClick={this.handleEditToggle}
                >
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
      );

      let profile = (
        <div style={{display: this.state.profileDisplay}}>
        <div className="row">
          <h2 className="header center-align">My Profile</h2>
        </div>
          <div className="row">
            <div className="col s12">
            </div>
            <div className="col s8 offset-s2">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={cardImage} />
                  <span className="card-title activator">
                    {`${this.state.user.name.first} ${this.state.user.name.last}`}
                  </span>
                </div>
                <div className="card-action">
                    <a className="btn-floating"
                        data-position="top"
                        data-delay="50"
                        data-tooltip="Edit Profile"
                        onClick={this.handleEditToggle}
                    >
                      <i className="material-icons">edit</i>
                    </a>
                    <span className="card-title activator grey-text text-darken-4">
                      <i className="material-icons right icon-align">more_vert</i>
                    </span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4 center">
                    Full Profile
                    <i className="material-icons right">close</i>
                  </span>
                  <p className="flow-text"><i className="material-icons left icon-align">face</i>
                    Name: {`${this.state.user.name.first} ${this.state.user.name.last}`}
                  </p>
                  <p className="flow-text"><i className="material-icons left icon-align">email</i>
                    Email: {this.state.user.email}
                  </p>
                  <p className="flow-text"><i className="material-icons left icon-align">settings</i>
                    Role: {this.state.user.role.title}
                  </p>
                </div>
                </div>
            </div>
          </div>
        </div>
      );

      return (
        <div className="container">
          {this.state.editDisplay === 'none'
            ? profile
            : editForm
          }
        </div>
      );
    }
  }

  module.exports = Profile;

})();
