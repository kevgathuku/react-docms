(() =>{
  'use strict';

  let assign = require('object-assign'),
      AppConstants = require('../constants/AppConstants'),
      AppDispatcher = require('../dispatcher/AppDispatcher'),
      BaseStore = require('./BaseStore');

  let UserStore = assign({}, BaseStore, {
    session: null,
    loginResult: null,
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
      this.emitChange();
    },

    getLoginResult: function() {
      return this.loginResult;
    },

    setSignupResult: function(signupResult) {
      this.signupResult = signupResult;
      this.emitChange();
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
