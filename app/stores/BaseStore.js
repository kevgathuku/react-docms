(() => {
  'use strict';

  let EventEmitter = require('events').EventEmitter;
  if (!Object.assign) {
    Object.assign = require('object-assign');
  }

  let BaseStore = Object.assign({}, EventEmitter.prototype, {

    emitChange(event='change') {
      this.emit(event);
    },

    addChangeListener(callback, event='change') {
      this.on(event, callback);
    },

    removeChangeListener(callback, event='change') {
      this.removeListener(event, callback);
    }
  });

  module.exports = BaseStore;

})();
