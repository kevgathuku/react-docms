(() => {
  'use strict';

  let AppConstants = require('../constants/AppConstants'),
      BaseActions  = require('./BaseActions');

  module.exports = {
    getRoles: (token) => {
      BaseActions.get('/api/roles', AppConstants.GET_ROLES, token);
    }

  };
})();
