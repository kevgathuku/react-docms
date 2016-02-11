(() => {
  'use strict';

  let AppConstants = require('../constants/AppConstants'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    BaseStore = require('./BaseStore');

  if (!Object.assign) {
    Object.assign = require('object-assign');
  }

  let DocStore = Object.assign({}, BaseStore, {
    docs: null,
    docDeleteResult: null,
    docEditResult: null,

    setDocs: function(docs) {
      this.docs = docs;
      this.emitChange();
    },

    getDocs: function() {
      return this.docs;
    },

    setDocEditResult: function(result) {
      this.docEditResult = result;
      this.emitChange('editDoc');
    },

    getDocEditResult: function() {
      return this.docEditResult;
    },

    setDocDeleteResult: function(result) {
      this.docDeleteResult = result;
      this.emitChange();
    },

    getDocDeleteResult: function() {
      return this.docDeleteResult;
    }
  });

  AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case AppConstants.USER_DOCS:
        DocStore.setDocs(action.data);
        break;
      case AppConstants.DELETE_DOC:
        DocStore.setDocDeleteResult({
          data: action.data,
          statusCode: action.statusCode
        });
        break;
      case AppConstants.EDIT_DOC:
        DocStore.setDocEditResult({
          data: action.data,
          statusCode: action.statusCode
        });
        break;
      default:
        // no default action
    }

    return true;
  });

  module.exports = DocStore;
})();
