(() => {
  'use strict';

  let AppConstants = require('../constants/AppConstants'),
    BaseActions = require('./BaseActions');

  module.exports = {
    login: function(user) {
      BaseActions.post('/api/users/login', user, AppConstants.USER_LOGIN);
    },

    signup: function(user) {
      BaseActions.post('/api/users', user, AppConstants.USER_SIGNUP);
    },

    session: function() {
      BaseActions.get('/api/users/session', AppConstants.USER_SESSION);
    }
  };
})();
