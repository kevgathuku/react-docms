import AppDispatcher from '../../dispatcher/AppDispatcher';
import DocStore from '../DocStore';
import constants from '../../constants/AppConstants';
import expect from 'expect';
import sinon from 'sinon';

describe('DocStore', function() {
  var registerSpy;

  before(function() {
    // Don't emit the change in the tests
    sinon.stub(DocStore, 'emitChange', function() {
      return true;
    });
    registerSpy = sinon.stub(AppDispatcher, 'register');
    sinon.spy(AppDispatcher, 'dispatch');
    registerSpy.onFirstCall().returnsArg(0);
  });

  after(function() {
    AppDispatcher.dispatch.restore();
    AppDispatcher.register.restore();
    registerSpy.restore();
  });

  it('adds all fetched documents', function() {
    sinon.spy(DocStore, 'setDocs');
    var docsAction = {
      actionType: constants.USER_DOCS,
      data: 'Another One'
    };
    AppDispatcher.dispatch(docsAction);
    expect(DocStore.setDocs.called).toBe(true);
    const myDocs = DocStore.getDocs();
    expect(myDocs).toBe(docsAction.data);
  });

  it('adds a created document', function() {
    sinon.spy(DocStore, 'setDocCreateResult');
    var createDocAction = {
      actionType: constants.CREATE_DOC,
      data: 'Another One'
    };
    AppDispatcher.dispatch(createDocAction);
    expect(DocStore.setDocCreateResult.called).toBe(true);
    const myDoc = DocStore.getDocCreateResult();
    expect(myDoc).toBe(createDocAction.data);
  });

  it('adds an edited document', function() {
    sinon.spy(DocStore, 'setDocEditResult');
    var editDocAction = {
      actionType: constants.EDIT_DOC,
      data: 'Another One',
      statusCode: 200
    };
    AppDispatcher.dispatch(editDocAction);
    expect(DocStore.setDocEditResult.called).toBe(true);
    const myDoc = DocStore.getDocEditResult();
    delete editDocAction.actionType;
    expect(myDoc).toEqual(editDocAction);
  });

  it('adds a deleted document', function() {
    sinon.spy(DocStore, 'setDocDeleteResult');
    var deleteDocAction = {
      actionType: constants.DELETE_DOC,
      data: 'Another One',
      statusCode: 204
    };
    AppDispatcher.dispatch(deleteDocAction);
    expect(DocStore.setDocDeleteResult.called).toBe(true);
    const data = DocStore.getDocDeleteResult();
    delete deleteDocAction.actionType;
    expect(data).toEqual(deleteDocAction);
  });

});
