(() => {
  'use strict';

  let AppDispatcher = require('../dispatcher/AppDispatcher');
  let request = require('superagent');

  module.exports = {
    get: (url, actionType, token=null) => {
      request
        .get(url)
        .set('x-access-token', token)
        .end((err, result) => {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    },

    delete: (url, actionType, token=null) => {
      request
        .delete(url)
        .set('x-access-token', token)
        .end((err, result) => {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body,
            statusCode: result.statusCode
          });
        });
    },

    put: (url, data, actionType, token=null) => {
      request
        .put(url)
        .set('x-access-token', token)
        .send(data)
        .end((err, result) => {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body,
            statusCode: result.statusCode
          });
        });
    },

    post: (url, data, actionType, token=null) => {
      request
        .post(url)
        .set('x-access-token', token)
        .send(data)
        .end((err, result) => {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    }
  };

})();
