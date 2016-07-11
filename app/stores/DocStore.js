(() => {
  'use strict';

  let Immutable = require('immutable'),
    AppConstants = require('../constants/AppConstants'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    BaseStore = require('./BaseStore');

  if (!Object.assign) {
    Object.assign = require('object-assign');
  }

  let DocStore = Object.assign({}, BaseStore, {
    doc: Immutable.Map(),
    docs: null,
    docCreateResult: null,
    docDeleteResult: null,
    docEditResult: null,

    setDocs(docs) {
      this.docs = docs;
      this.emitChange('fetchDocs');
    },

    getDocs() {
      return this.docs;
    },

    setDoc(doc) {
      this.doc = this.doc.merge(doc).toJS();
      this.emitChange('getDoc');
    },

    getDoc() {
      return this.doc;
    },

    setDocCreateResult(result) {
      this.docCreateResult = result;
      this.emitChange();
    },

    getDocCreateResult() {
      return this.docCreateResult;
    },

    setDocEditResult(result) {
      this.docEditResult = result;
      this.emitChange('editDoc');
    },

    getDocEditResult() {
      return this.docEditResult;
    },

    setDocDeleteResult(result) {
      this.docDeleteResult = result;
      this.emitChange();
    },

    getDocDeleteResult() {
      return this.docDeleteResult;
    }
  });

  AppDispatcher.register(function(action) {
    switch (action.actionType) {
    case AppConstants.USER_DOCS:
      DocStore.setDocs(action.data);
      break;
    case AppConstants.CREATE_DOC:
      DocStore.setDocCreateResult(action.data);
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
    case AppConstants.GET_DOC:
      DocStore.setDoc(action.data);
      break;
    default:
        // no default action
    }

    return true;
  });

  module.exports = DocStore;
})();
