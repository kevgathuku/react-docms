'use strict'

React = require('react')
Select = require('react-select')
RoleActions = require('../../actions/RoleActions')
RoleStore = require('../../stores/RoleStore')
UserActions = require('../../actions/UserActions')
UserStore = require('../../stores/UserStore')

class UsersAdmin extends React.Component
  constructor: ->
    super()
    @state =
      token: localStorage.getItem('user')
      selectedRole: null
      users: null
      roles: null
      access:
        'viewer': 'Public Documents',
        'staff': 'Staff and Public Documents',
        'admin': 'All Documents'
      options: []

  componentDidMount: ->
    RoleActions.getRoles(@state.token)
    UserActions.fetchAllUsers(@state.token)
    RoleStore.addChangeListener(@handleRolesResult)
    UserStore.addChangeListener(@handleUsersResult)

  componentWillUnmount: ->
    RoleStore.removeChangeListener(@handleRolesResult)
    UserStore.removeChangeListener(@handleUsersResult)

  handleRolesResult: =>
    roles = RoleStore.getRoles()
    @setState {roles: roles}

  handleUsersResult: =>
    users = UserStore.getUsers()
    @setState {users: users}

  getOptions: (input, callback) ->
    setTimeout(() =>
      callback(null, {
        options: @state.roles,
        # CAREFUL! Only set this to true when there are no more options,
        # or more specific queries will not be sent to the server.
        complete: true
      })
    , 1000)

  # Prepend the user object to the function arguments through bind
  handleSelectChange: (user, val) =>
    stateObject = ->
      returnObj = {}
      returnObj[user._id] = val
      return returnObj

    @setState(stateObject())
    # Update the user's Role
    # Don't update if the already existing role is the one chosen
    if user.role._id isnt val._id
      user.role = val
      UserActions.update(user._id, user, @state.token)

  renderUser: (user) =>
    access = if @state[user._id] then @state[user._id].title else user.role.title
    description = @state.access[access]
    return (
      React.createElement('tr', {'key': (user._id)},
        React.createElement('td', null, ('#{user.name.first} #{user.name.last}')),
        React.createElement('td', null, (user.email)),
        React.createElement('td', null,
          React.createElement(Select.Async, { \
              'clearable': (false),  \
              'labelKey': 'title',  \
              'valueKey': '_id',  \
              'loadOptions': (@getOptions),  \
              'name': 'role',  \
              'options': (@state.options),  \
              'onChange': (@handleSelectChange.bind(null, user)),  \
              'placeholder': 'Select Role',  \
              'value': (user.role)
           })),
        React.createElement('td', null, (description))
      )
  )

  render: ->
    return (
      React.createElement('div', {'className': 'container'},
        React.createElement('div', {'className': 'card-panel'},
          React.createElement('h2', {'className': 'header center-align'}, 'Manage Users'),
            React.createElement('div', {'className': 'row'},
              React.createElement('div', {'className': 'col s10 offset-s1 center-align'},
                React.createElement('table', {'className': 'centered'},
                  React.createElement('thead', null,
                    React.createElement('tr', null,
                      React.createElement('th', {'data-field': 'id'}, 'Name'),
                      React.createElement('th', {'data-field': 'name'}, 'Email'),
                      React.createElement('th', {'data-field': 'role'}, 'Role'),
                      React.createElement('th', {'data-field': 'role'}, 'Access')
                    )
                  ),
                  React.createElement('tbody', null,
                    (if @state.users then @state.users.map(@renderUser) else null)
                  )
                )
              )
            )
        )
      )
    )

module.exports = UsersAdmin
