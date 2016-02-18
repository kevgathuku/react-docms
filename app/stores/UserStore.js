(() =>{
  'use strict';

  let AppConstants = require('../constants/AppConstants'),
      AppDispatcher = require('../dispatcher/AppDispatcher'),
      BaseStore = require('./BaseStore');

  if (!Object.assign) {
    Object.assign = require('object-assign');
  }

  let UserStore = Object.assign({}, BaseStore, {
    users: null,
    session: null,
    loginResult: null,
    logoutResult: null,
    signupResult: null,
    updateResult: null,

    getUsers: function() {
      return this.users;
    },

    setUsers: function(users) {
      this.users = users;
      this.emitChange();
    },

    setSession: function(session) {
      this.session = session;
      this.emitChange();
    },

    getSession: function() {
      return this.session;
    },

    setLoginResult: function(loginResult) {
      this.loginResult = loginResult;
      this.emitChange('login');
    },

    getLoginResult: function() {
      return this.loginResult;
    },

    setLogoutResult: function(logoutResult) {
      this.logoutResult = logoutResult;
      this.emitChange();
    },

    getLogoutResult: function() {
      return this.logoutResult;
    },

    setSignupResult: function(signupResult) {
      this.signupResult = signupResult;
      this.emitChange('signup');
    },

    getSignupResult: function() {
      return this.signupResult;
    },

    setUpdateResult: function(updateResult) {
      this.updateResult = updateResult;
      this.emitChange('update');
    },

    getUpdateResult: function() {
      return this.updateResult;
    }
  });

  AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case AppConstants.USER_LOGIN:
        UserStore.setLoginResult(action.data);
        break;
      case AppConstants.USER_LOGOUT:
        UserStore.setLogoutResult(action.data);
        break;
      case AppConstants.USER_SIGNUP:
        UserStore.setSignupResult(action.data);
        break;
      case AppConstants.USER_SESSION:
        UserStore.setSession(action.data);
        break;
      case AppConstants.USER_UPDATE:
        UserStore.setUpdateResult(action.data);
        break;
      case AppConstants.GET_USERS:
        UserStore.setUsers(action.data);
        break;
      default:
        // no default action
    }

    return true;
  });

  module.exports = UserStore;
})();
