'use strict'

React = require 'react'
Select = require 'react-select'
RoleActions = require '../../actions/RoleActions'
RoleStore = require '../../stores/RoleStore'
UserActions = require '../../actions/UserActions'
UserStore = require '../../stores/UserStore'

{ div, h2, table, thead, tbody, td, th, tr } = React.DOM

class UsersAdmin extends React.Component
  constructor: ->
    super()
    @state =
      token: localStorage.getItem('user')
      selectedRole: null
      users: []
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

  getOptions: (input, callback) =>
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
    access = @state[user._id]?.title or user.role.title
    description = @state.access[access]
    return (
      tr({'key': (user._id)},
        td(null, ("#{user.name.first} #{user.name.last}")),
        td(null, (user.email)),
        td(null,
          React.createElement(Select.Async, { \
            'clearable': (false), \
            'labelKey': 'title', \
            'valueKey': '_id', \
            'loadOptions': (@getOptions), \
            'name': 'role', \
            'options': (@state.options), \
            'onChange': (@handleSelectChange.bind(null, user)), \
            'placeholder': 'Select Role', \
            'value': (user.role)
            })),
        td(null, (description))
      )
  )

  render: ->
    return (
      div({'className': 'container'},
        div({'className': 'card-panel'},
          h2({'className': 'header center-align'}, 'Manage Users'),
            div({'className': 'row'},
              div({'className': 'col s10 offset-s1 center-align'},
                table({'className': 'centered'},
                  thead(null,
                    tr(null,
                      th({'data-field': 'id'}, 'Name'),
                      th({'data-field': 'name'}, 'Email'),
                      th({'data-field': 'role'}, 'Role'),
                      th({'data-field': 'role'}, 'Access')
                    )
                  ),
                  tbody(null,
                    (@state.users.map(@renderUser))
                  )
                )
              )
            )
        )
      )
    )

module.exports = UsersAdmin
