'use strict';

import sinon from 'sinon';
import expect from 'expect';
import request from 'superagent';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import BaseActions from '../BaseActions';

describe('BaseActions', function() {
  let fakeToken = 'djfkffw';
  let fakeActionType = 'ANOTHER_ONE';
  let response = {
    body: 'response',
    statusCode: 418
  };
  let fakeURL = '/api/khaled';

  before(function() {
    sinon.stub(AppDispatcher, 'dispatch').returns(true);
    sinon.stub(request.Request.prototype, 'end', function(cb) {
      cb(null, response);
    });
  });

  after(function() {
    AppDispatcher.dispatch.restore();
    request.Request.prototype.end.restore();
  });

  describe('HTTP methods', function() {
    it('delete', function() {
      BaseActions.delete(fakeURL, fakeActionType, fakeToken);
      expect(AppDispatcher.dispatch.withArgs(
        {
          actionType: fakeActionType,
          data: response.body,
          statusCode: response.statusCode
        }
      ).called).toBe(true);
    });

    it('get', function() {
      BaseActions.get(fakeURL, fakeActionType, fakeToken);
      expect(AppDispatcher.dispatch.withArgs(
        {
          actionType: fakeActionType,
          data: response.body
        }
      ).called).toBe(true);
    });

    it('post', function() {
      BaseActions.post(fakeURL, response, fakeActionType, fakeToken);
      expect(AppDispatcher.dispatch.withArgs(
        {
          actionType: fakeActionType,
          data: response.body
        }
      ).called).toBe(true);
    });

    it('put', function() {
      BaseActions.put(fakeURL, response, fakeActionType, fakeToken);
      expect(AppDispatcher.dispatch.withArgs(
        {
          actionType: fakeActionType,
          data: response.body,
          statusCode: response.statusCode
        }
      ).called).toBe(true);
    });

  });
});
