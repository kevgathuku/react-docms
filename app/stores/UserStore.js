(() =>{
  'use strict';

  let AppConstants = require('../constants/AppConstants'),
      AppDispatcher = require('../dispatcher/AppDispatcher'),
      BaseStore = require('./BaseStore');

  if (!Object.assign) {
    Object.assign = require('object-assign');
  }

  let UserStore = Object.assign({}, BaseStore, {
    session: null,
    loginResult: null,
    logoutResult: null,
    signupResult: null,

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
      default:
        // no default action
    }

    return true;
  });

  module.exports = UserStore;
})();
