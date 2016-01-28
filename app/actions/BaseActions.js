(() => {
  'use strict';

  let AppDispatcher = require('../dispatcher/AppDispatcher');
  let request = require('superagent');

  module.exports = {
    get: function(url, actionType, token=null) {
      request
        .get(url)
        .set('x-access-token', token)
        .end(function(err, result) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    },

    delete: function(url, data, actionType, token=null) {
      request
        .delete(url)
        .set('x-access-token', token)
        .send(data || {})
        .end(function(err, result) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    },

    put: function(url, data, actionType, token=null) {
      request
        .put(url)
        .set('x-access-token', token)
        .send(data)
        .end(function(err, result) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    },

    post: function(url, data, actionType, token=null) {
      request
        .post(url)
        .set('x-access-token', token)
        .send(data)
        .end(function(err, result) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    }
  };

})();
