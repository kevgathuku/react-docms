{
  'use strict';

  var React = require('react'),
    DocEdit = require('./DocEdit.jsx'),
    RoleActions = require('../../actions/RoleActions'),
    RoleStore = require('../../stores/RoleStore'),
    cardImage = require('../../images/soccer.jpeg');

  class DocList extends React.Component {

    static propTypes = {
      deleteDoc: React.PropTypes.func,
      docs:  React.PropTypes.arrayOf(React.PropTypes.object),
      roles: React.PropTypes.arrayOf(React.PropTypes.object),
      updateDocs: React.PropTypes.func
    };

    constructor(props) {
      super(props);

      this.state = {
        docs: this.props.docs,
        deletedDoc: null,
        roles: null,
        token: localStorage.getItem('user')
      };

      this.handleRolesResult = this.handleRolesResult.bind(this);
    }

    componentDidMount() {
      RoleStore.addChangeListener(this.handleRolesResult);

      // Send a request to check the logged in user
      RoleActions.getRoles(this.state.token);
      // Activate the materialize tooltips
      setTimeout(function() {
        window.$('.tooltipped').each(function() {
          window.$(this).tooltip({'delay': 50});
        });
      }, 1000);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.docs !== this.state.docs) {
        this.setState({
          docs: nextProps.docs
        });
      }
    }

    componentWillUnmount() {
      RoleStore.removeChangeListener(this.handleRolesResult);
    }

    handleRolesResult() {
      let roles = RoleStore.getRoles();
      this.setState({roles: roles});
    }

    handleDocumentEdit(doc, event) {
      // Prevent the default action for clicking on a link
      event.preventDefault();
      // Get the id of the <a> tag that triggered the modal
      let id = `#${event.currentTarget.getAttribute('href')}`;
      // Open the specific modal when the link is clicked
      window.$(id).openModal();
    }

    render() {
      let renderDoc = function(doc) {
        return (
          <div className="col s12 m6 l4" key={doc._id}>
            <div id={`edit-modal-${doc._id}`} className="modal">
              <DocEdit doc={doc} roles={this.state.roles} updateDocs={this.props.updateDocs}/>
            </div>
            <div className="card">
              <div className="card-image">
                <img src={cardImage}/>
              </div>
              <div className="card-content">
                <h5 style={{fontSize: '1.44rem'}}>{doc.title}</h5>
                <p>{`By:  ${doc.ownerId.name.first} ${doc.ownerId.name.last}`}</p>
                <a className="btn-floating tooltipped blue lighten-1 right"
                    data-position="top"
                    data-delay="50"
                    data-tooltip="View"
                    href={`/documents/${doc._id}`}
                >
                  <i className="material-icons">play_arrow</i>
                </a>
              </div>
              <div className="card-action">
              </div>
            </div>
          </div>
        );
      };
      return (
        <div>{this.state.docs.map(renderDoc, this)}</div>
      );
    }
  }

  module.exports = DocList;

}
