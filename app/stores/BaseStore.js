(() => {
  'use strict';

  let EventEmitter = require('events').EventEmitter;
  if (!Object.assign) {
    Object.assign = require('object-assign');
  }

  let BaseStore = Object.assign({}, EventEmitter.prototype, {
    data: null,
    change: 'change',

    setData: function(data) {
      this.data = data;
      this.emitChange();
    },

    getData: function() {
      return this.data;
    },

    emitChange: function(event='change') {
      this.emit(event);
    },

    addChangeListener: function(callback, event='change') {
      this.on(event, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener('change', callback);
    }
  });

  module.exports = BaseStore;

})();
