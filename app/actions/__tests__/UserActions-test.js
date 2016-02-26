'use strict';

import sinon from 'sinon';
import expect from 'expect';
import AppConstants from '../../constants/AppConstants';
import BaseActions from '../BaseActions';
import UserActions from '../UserActions';

describe('UserActions', function() {
  let fakeToken = 'djfkffw';
  let payload = {};
  let userID = 1;

  beforeEach(function() {
    sinon.stub(BaseActions, 'delete').returns(true);
    sinon.stub(BaseActions, 'get').returns(true);
    sinon.stub(BaseActions, 'post').returns(true);
    sinon.stub(BaseActions, 'put').returns(true);
  });

  afterEach(function() {
    BaseActions.delete.restore();
    BaseActions.get.restore();
    BaseActions.post.restore();
    BaseActions.put.restore();
  });

  describe('calls BaseActions', function() {
    it('login', function() {
      UserActions.login(payload);
      expect(BaseActions.post.withArgs(
        '/api/users/login',
        payload,
        AppConstants.USER_LOGIN,
      ).called).toBe(true);
    });

    it('logout', function() {
      UserActions.logout(payload, fakeToken);
      expect(BaseActions.post.withArgs(
        '/api/users/logout',
        payload,
        AppConstants.USER_LOGOUT,
        fakeToken
      ).called).toBe(true);
    });

    it('signup', function() {
      UserActions.signup(payload);
      expect(BaseActions.post.withArgs(
        '/api/users',
        payload,
        AppConstants.USER_SIGNUP
      ).called).toBe(true);
    });

    it('update', function() {
      UserActions.update(userID, payload, fakeToken);
      expect(BaseActions.put.withArgs(
        `/api/users/${userID}`,
        payload,
        AppConstants.USER_UPDATE,
        fakeToken
      ).called).toBe(true);
    });
  });
});
