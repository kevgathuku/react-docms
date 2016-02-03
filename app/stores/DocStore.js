(() => {
  'use strict';

  let assign = require('object-assign'),
      AppConstants = require('../constants/AppConstants'),
      AppDispatcher = require('../dispatcher/AppDispatcher'),
      BaseStore = require('./BaseStore');

  let UserStore = assign({}, BaseStore, {
    docs: null,

    setDocs: function(docs) {
      this.docs = docs;
      this.emitChange();
    },

    getDocs: function() {
      return this.docs;
    }
  });

  AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case AppConstants.USER_DOCS:
        UserStore.setDocs(action.data);
        break;
      default:
        // no default action
    }

    return true;
  });

  module.exports = UserStore;
})();
