(() => {
  'use strict';

  let AppDispatcher = require('../dispatcher/AppDispatcher');
  let request = require('superagent');

  module.exports = {
    get: (url: string, actionType: string, token: ?string =null) => {
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

    delete: (url: string, actionType: string, token: ?string =null) => {
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

    put: (url: string, data: Object, actionType: string, token: ?string =null) => {
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

    post: (url: string, data: Object, actionType: string, token: ?string =null) => {
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
