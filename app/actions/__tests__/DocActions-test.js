'use strict';

import sinon from 'sinon';
import expect from 'expect';
import AppConstants from '../../constants/AppConstants';
import BaseActions from '../BaseActions';
import DocActions from '../DocActions';

describe('DocActions', function() {
  let fakeToken = 'djfkffw';
  let payload = {};
  let docID = 1;

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
    it('createDoc', function() {
      DocActions.createDoc(payload, fakeToken);
      expect(BaseActions.post.withArgs(
        '/api/documents',
        payload,
        AppConstants.CREATE_DOC,
        fakeToken
      ).called).toBe(true);
    });

    it('getDocs', function() {
      DocActions.getDocs(fakeToken);
      expect(BaseActions.get.withArgs(
        '/api/documents',
        AppConstants.USER_DOCS,
        fakeToken
      ).called).toBe(true);
    });

    it('deleteDocs', function() {
      DocActions.deleteDoc(docID, fakeToken);
      expect(BaseActions.delete.withArgs(
        `/api/documents/${docID}`,
        AppConstants.DELETE_DOC,
        fakeToken
      ).called).toBe(true);
    });

    it('editDoc', function() {
      DocActions.editDoc(docID, payload, fakeToken);
      expect(BaseActions.put.withArgs(
        `/api/documents/${docID}`,
        payload,
        AppConstants.EDIT_DOC,
        fakeToken
      ).called).toBe(true);
    });
  });
});
