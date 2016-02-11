(() => {
  'use strict';

  let React = require('react'),
      DocActions = require('../../actions/DocActions'),
      DocStore = require('../../stores/DocStore'),
      DocList = require('./DocList.jsx');

  class Dashboard extends React.Component {

    static propTypes = {
      updateDocs: React.PropTypes.func
    };

    constructor(props) {
      super(props);

      this.state = {
        docs: null
      };

      this.deleteDoc = this.deleteDoc.bind(this);
      this.handleDocsResult = this.handleDocsResult.bind(this);
      this.updateDocs = this.updateDocs.bind(this);
    }

    componentWillMount() {
      // Get the token from localStorage
      let token = localStorage.getItem('user');
      DocActions.getDocs(token);
      DocStore.addChangeListener(this.handleDocsResult);
    }

    componentWillUnmount() {
      DocStore.removeChangeListener(this.handleDocsResult);
    }

    handleDocsResult() {
      let docs = DocStore.getDocs();
      if (docs && !docs.error) {
        this.setState({
          docs: docs
        });
      }
    }

    updateDocs(doc) {
      let updatedDocs = this.state.docs.map((value) => {
        if (value._id == doc._id) {
          // Return the changed doc
          return doc;
        } else {
          return value;
        }
      });
      this.setState({
        docs: updatedDocs
      });
    }

    deleteDoc(docId) {
      // Remove the deleted doc from the docs in the state
      let updatedDocs = this.state.docs.filter((value) => {
        return value._id !== docId;
      });
      this.setState({
        docs: updatedDocs
      });
    }

    render() {
      return (
        <div className="container">
          <div className="row">
            <h2 className="header center-align">My Documents</h2>
          </div>
          <div className="row">
            {this.state.docs
              ? <DocList docs={this.state.docs} deleteDoc={this.deleteDoc} updateDocs={this.updateDocs}/>
              : <p>Loading...</p>}
          </div>
          <div className="fixed-action-btn" style={{bottom: 45, right: 24}}>
            <a className="btn-floating btn-large tooltipped red"
                data-delay="50"
                data-position="left"
                data-tooltip="Create Document"
                href="/documents/create"
            >
              <i className="material-icons">add</i>
            </a>
          </div>
        </div>
      );
    }
  }

  module.exports = Dashboard;

})();
