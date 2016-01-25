(function() {
  'use strict';

  let React = require('react');

  class LoginForm extends React.Component {
    constructor() {
      super();
      this.state = {
        user: {
          username: null,
          password: null
        },
        result: null
      };
    }

    handleFieldChange(event) {
      var field = event.target.name;
      var value = event.target.value;
      this.state.user[field] = value;
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
            <div className="col s2">
              <button className="btn waves-effect header-btn center-align"
                  name="action"
                  type="submit"
              > Login
              </button>
            </div>

          </form>
        </div>
      );
    }
  }

  module.exports = LoginForm;
})();
