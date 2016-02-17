(() => {
  'use strict';

  let React = require('react'),
      RoleActions = require('../../actions/RoleActions'),
      RoleStore = require('../../stores/RoleStore');

  class RolesAdmin extends React.Component {
    constructor() {
      super();
      this.state = {
        docs: null,
        token: localStorage.getItem('user')
      };
    }

    componentDidMount() {
      RoleActions.getRoles(this.state.token);
      RoleStore.addChangeListener(this.handleRolesResult);
    }

    componentWillUnmount() {
      RoleStore.removeChangeListener(this.handleRolesResult);
    }

    handleRolesResult = () => {
      let roles = RoleStore.getRoles();
      this.setState({roles: roles});
    }

    render() {
      let renderRole = (role) => {
        return (
          <tr key={role._id}>
          <td>{role.title}</td>
          <td>{role.accessLevel}</td>
        </tr>
      );
    };
      return (
        <div className="container">
          <div className="card-panel">
            <h2 className="header center-align">Manage Roles</h2>
              <div className="row">
                <div className="col s10 offset-s1 center-align">
                  <table className="centered">
                    <thead>
                      <tr>
                        <th data-field="id">Role</th>
                        <th data-field="name">Access Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.roles ? this.state.roles.map(renderRole) : null}
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
          <div className="fixed-action-btn" style={{bottom: 45, right: 24}}>
            <a className="btn-floating btn-large tooltipped pink"
                data-delay="50"
                data-position="left"
                data-tooltip="Create Role"
                href="/admin/roles/create"
            >
              <i className="material-icons">edit</i>
            </a>
          </div>
        </div>
      );
    }
  }

  module.exports = RolesAdmin;

})();
