(() => {
  'use strict';

  let AppConstants = require('../constants/AppConstants'),
      BaseActions  = require('./BaseActions');

  module.exports = {
    getDocs: function(token) {
      BaseActions.get('/api/documents', AppConstants.USER_DOCS, token);
    }
  };
})();
