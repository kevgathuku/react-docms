(() => {
  'use strict';

  let React = require('react'),
      DocActions = require('../../actions/DocActions'),
      DocStore = require('../../stores/DocStore'),
      RoleActions = require('../../actions/RoleActions'),
      RoleStore = require('../../stores/RoleStore'),
      UserActions = require('../../actions/UserActions'),
      UserStore = require('../../stores/UserStore');

  class Admin extends React.Component {
    constructor() {
      super();
      this.state = {
        docs: null,
        token: localStorage.getItem('user')
      };
    }

    componentDidMount() {
      DocActions.getDocs(this.state.token);
      RoleActions.getRoles(this.state.token);
      UserActions.fetchAllUsers(this.state.token);
      DocStore.addChangeListener(this.handleDocsResult, 'fetchDocs');
      RoleStore.addChangeListener(this.handleRolesResult);
      UserStore.addChangeListener(this.handleUsersResult);
    }

    componentWillUnmount() {
      DocStore.removeChangeListener(this.handleDocsResult, 'fetchDocs');
      RoleStore.removeChangeListener(this.handleRolesResult);
      UserStore.removeChangeListener(this.handleUsersResult);
    }

    handleDocsResult = () => {
      let docs = DocStore.getDocs();
      if (docs && !docs.error) {
        this.setState({
          docs: docs
        });
      }
    };

    handleRolesResult = () => {
      let roles = RoleStore.getRoles();
      this.setState({roles: roles});
    };

    handleUsersResult = () => {
      let users = UserStore.getUsers();
      this.setState({users: users});
    };

    render() {
      return (
        <div className="container">
          <div className="card-panel">
            <h2 className="header center-align">Admin Panel</h2>
            <div className="row">
              <div className="col s4 center-align">
                <h5>Total Users</h5>
                <p className="flow-text ">{this.state.users ? this.state.users.length : 0}</p>
                <a className="waves-effect waves-light btn blue" href="/admin/users">
                  <i className="material-icons left">face</i>
                  Manage Users</a>
              </div>
              <div className="col s4 center-align">
                <h5>Total Documents</h5>
                <p className="flow-text">{this.state.docs ? this.state.docs.length : 0}</p>
                <a className="waves-effect waves-light btn blue" href="/dashboard">
                  <i className="material-icons left">drafts</i>
                  Manage Documents</a>
              </div>
              <div className="col s4 center-align">
                <h5>Total Roles</h5>
                <p className="flow-text">{this.state.roles ? this.state.roles.length : 0}</p>
                <a className="waves-effect waves-light btn blue" href="/admin/roles">
                  <i className="material-icons left">settings</i>
                  Manage Roles</a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  module.exports = Admin;

})();
