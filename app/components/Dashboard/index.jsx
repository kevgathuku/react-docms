(() => {
  'use strict';

  let React = require('react'),
    DocActions = require('../../actions/DocActions'),
    DocStore = require('../../stores/DocStore'),
    DocList = require('./DocList');

  class Dashboard extends React.Component {
    constructor() {
      super();

      this.state = {
        docs: null
      };
    }

    componentDidMount() {
      // Get the token from localStorage
      let token = localStorage.getItem('user');
      DocActions.getDocs(token);
      DocStore.addChangeListener(this.handleDocsResult, 'fetchDocs');
    }

    componentWillUnmount() {
      DocStore.removeChangeListener(this.handleDocsResult, 'fetchDocs');
    }

    handleDocsResult = () => {
      let docs = DocStore.getDocs();
      if (docs && !docs.error) {
        this.setState({
          docs: docs
        });
      }
    };

    render() {
      return (
        <div className="container">
          <div className="row">
            <h2 className="header center-align">All Documents</h2>
          </div>
          <div className="row">
            {this.state.docs
              ? <DocList docs={this.state.docs} />
              : <p>Loading...</p>}
          </div>
          <div className="fixed-action-btn" style={{bottom: 45, right: 24}}>
            <a className="btn-floating btn-large tooltipped pink"
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
