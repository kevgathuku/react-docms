{
  'use strict';

  var React = require('react'),
    DocActions = require('../../actions/DocActions'),
    DocStore = require('../../stores/DocStore'),
    DocEdit = require('./DocEdit.jsx'),
    RoleActions = require('../../actions/RoleActions'),
    RoleStore = require('../../stores/RoleStore'),
    UserActions = require('../../actions/UserActions'),
    UserStore = require('../../stores/UserStore'),
    cardImage = require('../../images/soccer.jpeg');

  class Dashboard extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        docs: null,
        deletedDoc: null,
        roles: null,
        user: null
      };

      this.handleDocsResult = this.handleDocsResult.bind(this);
      this.handleDeleteResult = this.handleDeleteResult.bind(this);
      this.handleDocumentDelete = this.handleDocumentDelete.bind(this);
      this.handleRolesResult = this.handleRolesResult.bind(this);
      this.handleUserFetch = this.handleUserFetch.bind(this);
      this.updateDocs = this.updateDocs.bind(this);
    }

    componentDidMount() {
      DocStore.addChangeListener(this.handleDeleteResult);
      RoleStore.addChangeListener(this.handleRolesResult);
      DocStore.addChangeListener(this.handleDocsResult);
      // Add a change listener for the user session
      UserStore.addChangeListener(this.handleUserFetch);

      // Get the token from localStorage
      let token = localStorage.getItem('user');
      DocActions.getDocs(token);
      // Send a request to check the logged in user
      RoleActions.getRoles(token);
      // Activate the materialize tooltips
      setTimeout(function() {
        window.$('.tooltipped').each(function() {
          window.$(this).tooltip({'delay': 50});
        });
      }, 1000);

      UserActions.getSession(token);
    }

    componentWillUnmount() {
      DocStore.removeChangeListener(this.handleDeleteResult);
      DocStore.removeChangeListener(this.handleDocsResult);
      RoleStore.removeChangeListener(this.handleRolesResult);
      UserStore.removeChangeListener(this.handleUserFetch);
    }

    handleDocsResult() {
      let docs = DocStore.getDocs();
      if (docs && !docs.error) {
        this.setState({docs: docs});
      }
    }

    handleUserFetch() {
      let response = UserStore.getSession();
      if (response && !response.error) {
        this.setState({user: response.user});
      }
    }

    handleRolesResult() {
      let roles = RoleStore.getRoles();
      this.setState({roles: roles});
    }

    handleDocumentDelete(doc, event) {
      // Prevent the default action for clicking on a link
      event.preventDefault();
      window.swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this document!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: false
      }, () => {
        let token = localStorage.getItem('user');
        // Save the doc scheduled for deletion in the state
        this.setState({deletedDoc: doc._id});
        DocActions.deleteDoc(doc._id, token);
      });
    }

    handleDocumentEdit(doc, event) {
      // Prevent the default action for clicking on a link
      event.preventDefault();
      // Get the id of the <a> tag that triggered the modal
      let id = `#${event.currentTarget.getAttribute('href')}`;
      // Open the specific modal when the link is clicked
      window.$(id).openModal();
    }

    handleDeleteResult() {
      var result = DocStore.getDocDeleteResult();
      if (result && result.statusCode === 204) {
        // Remove the deleted doc from the docs in the state
        let newState = this.state.docs.filter((value) => {
          return value._id !== this.state.deletedDoc;
        });
        this.setState({deletedDoc: null});
        this.setState({docs: newState});
        window.swal('Deleted!', 'Your document has been deleted.', 'success');
      }
    }

    updateDocs(doc) {
      let updatedDocs = this.state.docs.map((value) => {
        if (value._id == doc._id) {
          return doc;
        } else {
          return value;
        }
      });
      this.setState({
        docs: updatedDocs
      });
    }

    render() {
      let renderDoc = function(doc) {
        var disabled;
        if (this.state.user) {
          disabled = this.state.user._id == doc.ownerId._id
            ? false
            : true;
        }
        return (
          <div className="col s12 m6 l4" key={doc._id}>
            <div id={`edit-modal-${doc._id}`} className="modal">
              <DocEdit doc={doc} roles={this.state.roles} updateDocs={this.updateDocs}/>/>
            </div>
            <div className="card">
              <div className="card-image">
                <img src={cardImage}/>
              </div>
              <div className="card-content">
                <h5>{doc.title}</h5>
                <p>{`Creator:  ${doc.ownerId.name.first} ${doc.ownerId.name.last}`}</p>
              </div>
              <div className="card-action">
                <a className="btn-floating tooltipped" data-position="top" data-delay="50" data-tooltip="Details">
                  <i className="material-icons">info_outline</i>
                </a>
                <a className="btn-floating modal-trigger tooltipped" data-position="top" data-delay="50" data-tooltip="Edit" href={`edit-modal-${doc._id}`} onClick={this.handleDocumentEdit.bind(this, doc)}>
                  <i className="material-icons">mode_edit</i>
                </a>
                <button disabled={disabled} className="tooltipped btn-floating" data-position="top" data-delay="50" data-tooltip="Delete" onClick={this.handleDocumentDelete.bind(this, doc)}>
                  <i className="material-icons">delete</i>
                </button>
              </div>
            </div>
          </div>
        );
      };
      return (
        <div className="container">
          <div className="row">
            <h2 className="header center-align">My Documents</h2>
          </div>
          <div className="row">
            {this.state.docs
              ? this.state.docs.map(renderDoc, this)
              : <p>Loading...</p>}
          </div>
        </div>
      );
    }
  }

  module.exports = Dashboard;

}
