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

    getUsers() {
      return this.users;
    },

    setUsers(users) {
      this.users = users;
      this.emitChange();
    },

    setSession(session) {
      this.session = session;
      this.emitChange();
    },

    getSession() {
      return this.session;
    },

    setLoginResult(loginResult) {
      this.loginResult = loginResult;
      this.emitChange('login');
    },

    getLoginResult() {
      return this.loginResult;
    },

    setLogoutResult(logoutResult) {
      this.logoutResult = logoutResult;
      this.emitChange();
    },

    getLogoutResult() {
      return this.logoutResult;
    },

    setSignupResult(signupResult) {
      this.signupResult = signupResult;
      this.emitChange('signup');
    },

    getSignupResult() {
      return this.signupResult;
    },

    setUpdateResult(updateResult) {
      this.updateResult = updateResult;
      this.emitChange('update');
    },

    getUpdateResult() {
      return this.updateResult;
    }
  });

  AppDispatcher.register((action) => {
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
