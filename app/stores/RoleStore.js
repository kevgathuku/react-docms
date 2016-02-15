(() => {
  'use strict';

  let AppConstants = require('../constants/AppConstants'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    BaseStore = require('./BaseStore');

    if (!Object.assign) {
      Object.assign = require('object-assign');
    }

  let RoleStore = Object.assign({}, BaseStore, {
    roles: null,

    setRoles(roles) {
      this.roles = roles;
      this.emitChange();
    },

    getRoles() {
      return this.roles;
    }

  });

  AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case AppConstants.GET_ROLES:
        RoleStore.setRoles(action.data);
        break;
      default:
        // no default action
    }
    return true;
  });

  module.exports = RoleStore;

})();
