(() => {
  'use strict';

  let React = require('react'),
      Select = require('react-select'),
      RoleActions = require('../../actions/RoleActions'),
      RoleStore = require('../../stores/RoleStore'),
      UserActions = require('../../actions/UserActions'),
      UserStore = require('../../stores/UserStore');

  class UsersAdmin extends React.Component {
    constructor() {
      super();
      this.state = {
        token: localStorage.getItem('user'),
        selectedRole: null,
        users: null,
        roles: null,
        access: {
          'viewer': 'Public Documents',
          'staff': 'Staff and Public Documents',
          'admin': 'All Documents'
        },
        options: []
      };
    }

    componentDidMount() {
      RoleActions.getRoles(this.state.token);
      UserActions.fetchAllUsers(this.state.token);
      RoleStore.addChangeListener(this.handleRolesResult);
      UserStore.addChangeListener(this.handleUsersResult);
    }

    componentWillUnmount() {
      RoleStore.removeChangeListener(this.handleRolesResult);
      UserStore.removeChangeListener(this.handleUsersResult);
    }

    handleRolesResult = () => {
      let roles = RoleStore.getRoles();
      this.setState({roles: roles});
    };

    handleUsersResult = () => {
      let users = UserStore.getUsers();
      this.setState({users: users});
    };

    getOptions = (input, callback) => {
      setTimeout(() => {
        callback(null, {
          options: this.state.roles,
          // CAREFUL! Only set this to true when there are no more options,
          // or more specific queries will not be sent to the server.
          complete: true
        });
      }, 1000);
    };

    // Prepend the user object to the function arguments through bind
    handleSelectChange = (user, val) => {
      let stateObject = function() {
        let returnObj = {};
        returnObj[user._id] = val;
        return returnObj;
      }();
      this.setState(stateObject);
      // Update the user's Role
      // Don't update if the already existing role is the one chosen
      if (user.role._id !== val._id) {
        user.role = val;
        UserActions.update(user._id, user, this.state.token);
      }
    };

    render() {
      let renderUser = (user) => {
        let access = this.state[user._id] ? this.state[user._id].title : user.role.title;
        let description = this.state.access[access];
        return (
          <tr key={user._id}>
          <td>{`${user.name.first} ${user.name.last}`}</td>
          <td>{user.email}</td>
          <td>
            <Select.Async
                clearable={false}
                labelKey="title"
                valueKey="_id"
                loadOptions={this.getOptions}
                name="role"
                options={this.state.options}
                onChange={this.handleSelectChange.bind(null, user)}
                placeholder="Select Role"
                value={user.role}
            /></td>
          <td>{description}</td>
        </tr>
      );
    };
      return (
        <div className="container">
          <div className="card-panel">
            <h2 className="header center-align">Manage Users</h2>
              <div className="row">
                <div className="col s10 offset-s1 center-align">
                  <table className="centered">
                    <thead>
                      <tr>
                        <th data-field="id">Name</th>
                        <th data-field="name">Email</th>
                        <th data-field="role">Role</th>
                        <th data-field="role">Access</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.users ? this.state.users.map(renderUser) : null}
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
        </div>
      );
    }
  }

  module.exports = UsersAdmin;

})();
