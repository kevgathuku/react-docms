(() => {
  'use strict';

  let AppConstants = require('../constants/AppConstants'),
      BaseActions  = require('./BaseActions');

  module.exports = {
    getDocs: (token) => {
      BaseActions.get(
        '/api/documents',
        AppConstants.USER_DOCS,
        token
      );
    },

    deleteDoc: (docID, token) => {
      BaseActions.delete(
        `/api/documents/${docID}`,
        AppConstants.DELETE_DOC,
        token
      );
    },

    editDoc: (docID, updatedDoc, token) => {
      BaseActions.put(
        `/api/documents/${docID}`,
        updatedDoc,
        AppConstants.EDIT_DOC,
        token
      );
    }
  };
})();
