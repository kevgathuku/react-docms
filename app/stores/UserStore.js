(() =>{
  'use strict';

  let assign = require('object-assign'),
      AppConstants = require('../constants/AppConstants'),
      AppDispatcher = require('../dispatcher/AppDispatcher'),
      BaseStore = require('./BaseStore');

  let UserStore = assign({}, BaseStore, {
    user: null,
    loginResult: null,
    setUser: function(user) {
      this.user = user;
      this.emitChange();
    },

    getUser: function() {
      return this.user;
    },

    setLoginResult: function(loginResult) {
      this.loginResult = loginResult;
      this.emitChange();
    },

    getLoginResult: function() {
      return this.loginResult;
    }
  });

  AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case AppConstants.USER_LOGIN:
        UserStore.setLoginResult(action.data);
        break;
      case AppConstants.USER_SIGNUP:
        UserStore.setUser(action.data);
        break;
      default:
        // no default action
    }

    return true;
  });

  module.exports = UserStore;
})();
