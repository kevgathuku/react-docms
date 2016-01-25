(function() {
  'use strict';

  var React = require('react');

  var LoginForm = React.createClass({

    getInitialState: function() {
      return {
        user: {
          username: '',
          password: ''
        },
        result: ''
      };
    },

    handleFieldChange: function(event) {
      var field = event.target.name;
      var value = event.target.value;
      this.state.user[field] = value;
    },

    render: function() {
      return (
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="input-field col s12">
              <i className="material-icons prefix">mail_outline</i>
              <input className="validate"
                  id="email"
                  name="email"
                  onChange={this.handleFieldChange}
                  required
                  type="text"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <i className="material-icons prefix">lock_open</i>
              <input className="validate"
                  id="password"
                  name="password"
                  onChange={this.handleFieldChange}
                  required
                  type="password"
              />
              <label htmlFor="password">password</label>
            </div>
            <div className="col s2">
              <button className="btn waves-effect header-btn"
                  name="action"
                  type="submit"
              >
                <i className="fa fa-sign-in"></i>
              </button>
            </div>

          </form>
        </div>
      );
    }
  });

  module.exports = LoginForm;
})();
