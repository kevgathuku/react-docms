(() => {
  'use strict';

  let EventEmitter = require('events').EventEmitter;
  if (!Object.assign) {
    Object.assign = require('object-assign');
  }

  let BaseStore = Object.assign({}, EventEmitter.prototype, {
    data: null,
    setData: function(data) {
      this.data = data;
      this.emitChange();
    },

    getData: function() {
      return this.data;
    },

    emitChange: function() {
      this.emit('change');
    },

    addChangeListener: function(callback) {
      this.on('change', callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener('change', callback);
    }
  });

  module.exports = BaseStore;

})();
