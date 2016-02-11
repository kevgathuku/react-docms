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
        doc: null,
        parsedDate: null
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
      let createdDate = this.state.doc.dateCreated;
      let m = window.moment(new Date(createdDate));
      this.setState({
        parsedDate: m.fromNow()
      });
    }

    htmlFromPlainText(subject) {
       // Step 1 (plain text searches)
       subject = subject.replace(/&/g, '&amp;').
       replace(/</g, '&lt;').
       replace(/>/g, '&gt;');
       // Step 2
       subject = subject.replace(/\r\n?|\n/g, '<br>');
       // Step 3
       subject = subject.replace(/<br>\s*<br>/g, '</p><p>');
       // Step 4
       subject = '<p>' + subject + '</p>';
       return subject;
    }

    render() {
      let ownerName = this.state.doc
                        ? `${this.state.doc.ownerId.name.first} ${this.state.doc.ownerId.name.last}`
                        : 'User';
      return (
        <div className="container">
          <div className="card-panel">
            <div className="row">
              <h2 className="header center-align"> {this.state.doc ? this.state.doc.title : 'title'} </h2>
              <h6 className="center">
                {this.state.parsedDate ? `${this.state.parsedDate} by ${ownerName}` : 'today'}
              </h6>
            </div>
            <div className="row">
              {this.state.doc ? this.state.doc.content : 'Loading...'}
            </div>
          </div>
          <div className="fixed-action-btn" style={{bottom: 45, right: 24}}>
            <a className="btn-floating btn-large pink">
              <i className="material-icons">toc</i>
            </a>
            <ul>
              <li><a className="btn-floating red"><i className="material-icons">mode_edit</i></a></li>
              <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
              <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
              <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
            </ul>
          </div>
        </div>
      );
    }
  }

  module.exports = DocumentPage;

})();
