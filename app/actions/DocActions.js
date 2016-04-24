/* @flow */
(() => {
  'use strict';

  let AppConstants = require('../constants/AppConstants'),
      BaseActions  = require('./BaseActions');

  module.exports = {
    createDoc: (body, token: ?string) => {
      BaseActions.post(
        '/api/documents',
        body,
        AppConstants.CREATE_DOC,
        token
      );
    },

    getDocs: (token: ?string) => {
      BaseActions.get(
        '/api/documents',
        AppConstants.USER_DOCS,
        token
      );
    },

    fetchDoc: (docId, token: ?string) => {
      BaseActions.get(
        `/api/documents/${docId}`,
        AppConstants.GET_DOC,
        token
      );
    },

    deleteDoc: (docID, token: ?string) => {
      BaseActions.delete(
        `/api/documents/${docID}`,
        AppConstants.DELETE_DOC,
        token
      );
    },

    editDoc: (docID, updatedDoc, token: ?string) => {
      BaseActions.put(
        `/api/documents/${docID}`,
        updatedDoc,
        AppConstants.EDIT_DOC,
        token
      );
    }
  };
})();
