import AppDispatcher from '../../dispatcher/AppDispatcher';
import UserStore from '../UserStore';
import constants from '../../constants/AppConstants';
import expect from 'expect';
import sinon from 'sinon';

describe('UserStore', function() {
  var registerSpy;

  before(function() {
    // Don't emit the change in the tests
    sinon.stub(UserStore, 'emitChange', function() {
      return true;
    });
    registerSpy = sinon.stub(AppDispatcher, 'register');
    sinon.spy(AppDispatcher, 'dispatch');
    registerSpy.onFirstCall().returnsArg(0);
  });

  after(function() {
    AppDispatcher.dispatch.restore();
    registerSpy.restore();
  });

  it('adds all fetched users', function() {
    sinon.spy(UserStore, 'setUsers');
    var userPayload = {
      actionType: constants.GET_USERS,
      data: 'Another One'
    };
    AppDispatcher.dispatch(userPayload);
    expect(UserStore.setUsers.called).toBe(true);
    const myDocs = UserStore.getUsers();
    expect(myDocs).toBe(userPayload.data);
  });

  it('saves the user session', function() {
    sinon.spy(UserStore, 'setSession');
    var userPayload = {
      actionType: constants.USER_SESSION,
      data: 'Another One'
    };
    AppDispatcher.dispatch(userPayload);
    expect(UserStore.setSession.called).toBe(true);
    const myDocs = UserStore.getSession();
    expect(myDocs).toBe(userPayload.data);
  });

  it('saves the user login result', function() {
    sinon.spy(UserStore, 'setLoginResult');
    var userPayload = {
      actionType: constants.USER_LOGIN,
      data: 'Another One'
    };
    AppDispatcher.dispatch(userPayload);
    expect(UserStore.setLoginResult.called).toBe(true);
    const myDocs = UserStore.getLoginResult();
    expect(myDocs).toBe(userPayload.data);
  });

  it('saves the user logout result', function() {
    sinon.spy(UserStore, 'setLogoutResult');
    var userPayload = {
      actionType: constants.USER_LOGOUT,
      data: 'Another One'
    };
    AppDispatcher.dispatch(userPayload);
    expect(UserStore.setLogoutResult.called).toBe(true);
    const myDocs = UserStore.getLogoutResult();
    expect(myDocs).toBe(userPayload.data);
  });

  it('saves the user signup result', function() {
    sinon.spy(UserStore, 'setSignupResult');
    var userPayload = {
      actionType: constants.USER_SIGNUP,
      data: 'Another One'
    };
    AppDispatcher.dispatch(userPayload);
    expect(UserStore.setSignupResult.called).toBe(true);
    const myDocs = UserStore.getSignupResult();
    expect(myDocs).toBe(userPayload.data);
  });

  it('saves the user update result', function() {
    sinon.spy(UserStore, 'setUpdateResult');
    var userPayload = {
      actionType: constants.USER_UPDATE,
      data: 'Another One'
    };
    AppDispatcher.dispatch(userPayload);
    expect(UserStore.setUpdateResult.called).toBe(true);
    const myDocs = UserStore.getUpdateResult();
    expect(myDocs).toBe(userPayload.data);
  });

});
