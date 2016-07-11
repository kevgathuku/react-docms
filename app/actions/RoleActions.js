(() => {
  'use strict';

  let AppConstants = require('../constants/AppConstants'),
    BaseActions  = require('./BaseActions');

  module.exports = {
    create: (data, token) => {
      BaseActions.post('/api/roles', data, AppConstants.CREATE_ROLE, token);
    },

    getRoles: (token) => {
      BaseActions.get('/api/roles', AppConstants.GET_ROLES, token);
    }

  };
})();
