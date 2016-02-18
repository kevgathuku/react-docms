(() => {
  'use strict';

  let AppConstants = require('../constants/AppConstants'),
      BaseActions  = require('./BaseActions');

  module.exports = {
    login: (user) => {
      BaseActions.post('/api/users/login', user, AppConstants.USER_LOGIN);
    },

    logout: (data, token) => {
      BaseActions.post('/api/users/logout', data, AppConstants.USER_LOGOUT, token);
    },

    signup: (user) => {
      BaseActions.post('/api/users', user, AppConstants.USER_SIGNUP);
    },

    update: (userID, user, token) => {
      BaseActions.put(`/api/users/${userID}`, user, AppConstants.USER_UPDATE, token);
    },

    getSession: (token) => {
      BaseActions.get('/api/users/session', AppConstants.USER_SESSION, token);
    },

    fetchAllUsers: (token) => {
      BaseActions.get('/api/users', AppConstants.GET_USERS, token);
    }
  };
})();
