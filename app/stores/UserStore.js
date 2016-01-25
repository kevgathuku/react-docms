(() =>{
  'use strict';

  let assign = require('object-assign'),
      AppConstants = require('../constants/AppConstants'),
      AppDispatcher = require('../dispatcher/AppDispatcher'),
      BaseStore = require('./BaseStore');

  let UserStore = assign({}, BaseStore, {
    user: null,
    setUser: function(user) {
      this.user = user;
      this.emitChange();
    },

    getUser: function() {
      return this.user;
    }
  });

  AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case AppConstants.USER_LOGIN:
        UserStore.setUser(action.data);
        break;
      case AppConstants.USER_SIGNUP:
        UserStore.setUser(action.data);
        break;
      case AppConstants.USER_SESSION:
        UserStore.setUser(action.data);
        break;
      default:
        // no default action
    }

    return true;
  });

  module.exports = UserStore;
})();
