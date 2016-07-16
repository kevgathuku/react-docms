(() => {
  'use strict';

  let React = require('react'),
    browserHistory = require('react-router').browserHistory,
    RoleActions = require('../../actions/RoleActions'),
    RoleStore = require('../../stores/RoleStore');

  class CreateRole extends React.Component {

    constructor() {
      super();
      this.state = {
        token: localStorage.getItem('user'),
        title: ''
      };
    }

    componentDidMount() {
      RoleStore.addChangeListener(this.handleRoleCreateResult);
    }

    componentWillUnmount() {
      RoleStore.removeChangeListener(this.handleRoleCreateResult);
    }

    handleRoleCreateResult = () => {
      let data = RoleStore.getCreatedRole();
      if (data) {
        if (data.error) {
          window.Materialize.toast(data.error, 2000, 'error-toast');
        } else {
          window.Materialize.toast('Role created successfully!', 2000, 'success-toast');
          browserHistory.push('/admin/roles');
        }
      }
    };

    handleFieldChange = (event) => {
      // A function bound to the event object
      let stateObject = function() {
        let returnObj = {};
        returnObj[this.target.name] = this.target.value;
        return returnObj;
      }.bind(event)();

      this.setState(stateObject);
    };

    handleSubmit = (event) => {
      event.preventDefault();
      if (!this.state.title) {
        window.Materialize.toast('Please Provide a Role Title', 2000, 'error-toast');
      }
      let role = {
        title: this.state.title
      };
      RoleActions.create(role, this.state.token);
    };

    render() {
      return (
        <div className="container">
          <div className="row">
            <h2 className="header center-align">Create Role</h2>
          </div>
          <div className="row">
            <form className="col s12" onSubmit={this.handleSubmit}>
                <div className="input-field col s4 offset-s2">
                  <input className="validate"
                      id="title"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleFieldChange}
                      type="text"
                  />
                <label className="active" htmlFor="title">Title</label>
                </div>
                <div className="col s6">
                  <button className="btn waves-effect header-btn blue"
                      name="action"
                      type="submit"
                      style={{top: '25px', position: 'relative'}}
                  >submit
                  <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
          </div>
        </div>
      );
    }
  }

  module.exports = CreateRole;

})();
