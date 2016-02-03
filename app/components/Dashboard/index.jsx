(() => {
  'use strict';

  let React = require('react'),
      DocActions = require('../../actions/DocActions'),
      DocStore = require('../../stores/DocStore'),
      DocList = require('./DocList.jsx');

  class Dashboard extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        docs: null
      };

      this.handleDocsResult = this.handleDocsResult.bind(this);
    }

    componentWillMount() {
      // Get the token from localStorage
      let token = localStorage.getItem('user');
      DocActions.getDocs(token);
      DocStore.addChangeListener(this.handleDocsResult);
    }

    handleDocsResult() {
      let docs = DocStore.getDocs();
      if (docs && !docs.error) {
        this.setState({
          docs: docs
        });
      }
    }

    render() {
      return (
        <div className="container">
          <div className="row">
            <h2 className="header center-align">My Documents</h2>
          </div>
          <div className="row">
            {this.state.docs
              ? <DocList docs={this.state.docs}/>
              : <p>Loading...</p>}
          </div>
        </div>
      );
    }
  }

  module.exports = Dashboard;

})();
