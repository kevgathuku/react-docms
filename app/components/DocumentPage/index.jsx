(() => {
  'use strict';

  let React = require('react'),
      DocActions = require('../../actions/DocActions'),
      DocStore = require('../../stores/DocStore');

  class DocumentPage extends React.Component {
    static propTypes = {
      params: React.PropTypes.object
    };

    constructor(props) {
      super(props);

      this.state = {
        doc: null
      };

      this.handleDocumentFetch = this.handleDocumentFetch.bind(this);

    }

    componentWillMount() {
      // Get the token from localStorage
      let token = localStorage.getItem('user');
      DocActions.fetchDoc(this.props.params.id, token);
      DocStore.addChangeListener(this.handleDocumentFetch, 'getDoc');
    }

    componentWillUnmount() {
      DocStore.removeChangeListener(this.handleDocumentFetch, 'getDoc');
    }

    handleDocumentFetch() {
      let result = DocStore.getDoc();
      this.setState({
        doc: result.data
      });
    }

    render() {
      return (
        <div className="container">
          <div className="card-panel">
            <div className="row">
              <h2 className="header center-align"> {this.state.doc ? this.state.doc.title : 'title'} </h2>
            </div>
            <div className="row">
              {this.state.doc ? this.state.doc.content : 'Loading...'}
            </div>
          </div>
        </div>
      );
    }
  }

  module.exports = DocumentPage;

})();
