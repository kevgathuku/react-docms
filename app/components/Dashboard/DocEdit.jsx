(() => {
  'use strict';

  let React = require('react'),
      DocActions = require('../../actions/DocActions'),
      DocStore = require('../../stores/DocStore');

  class DocEdit extends React.Component {
    static propTypes = {
      doc: React.PropTypes.object,
      roles: React.PropTypes.arrayOf(React.PropTypes.object),
      updateDocs: React.PropTypes.func
    };

    constructor(props) {
      super(props);

      this.state = {
        token: localStorage.getItem('user'),
        title: this.props.doc.title,
        content: this.props.doc.content,
        role: this.props.doc.role
      };

      this.handleEditResult = this.handleEditResult.bind(this);
      this.handleFieldChange = this.handleFieldChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      DocStore.addChangeListener(this.handleEditResult);
      setTimeout(function() {
        window.$('select').material_select();
      }, 1000);
    }

    componentWillUnmount() {
      DocStore.removeChangeListener(this.handleEditResult);
    }

    handleFieldChange(event) {
      // A function bound to the event object
      let stateObject = function() {
        let returnObj = {};
        returnObj[this.target.name] = this.target.value;
        return returnObj;
      }.bind(event)();

      this.setState(stateObject);
    }

    handleSubmit(event) {
      event.preventDefault();
        let documentPayload = {
          title: this.state.title,
          content: this.state.content,
          role: this.state.role
        };
        DocActions.editDoc(
          this.props.doc._id,
          documentPayload,
          this.state.token
        );
    }

    handleEditResult() {
      let result = DocStore.getDocEditResult();
      if (result && result.data._id === this.props.doc._id) {
        if (result.statusCode === 200) {
          this.props.updateDocs(result.data);
          window.Materialize.toast('Document Updated!', 4000);
        } else {
          window.Materialize.toast(result.error, 2000, 'error-toast');
        }
      }
    }

    render() {
      return (
        <div>
          <div className="modal-content">
            <h4 className="center-align">Edit Document</h4>
            <div className="row">
              <form className="col s12">
                <div className="input-field col s6">
                  <input className="validate"
                      id="title"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleFieldChange}
                      type="text"
                  />
                <label className="active" htmlFor="title">Title</label>
                </div>
                <div className="input-field col s6">
                  <select>
                    {/* TODO: fix showing select with correct roles */}
                    <option value="" disabled defaultValue>Choose a Role</option>
                      {this.props.roles ? this.props.roles.map((role) => {
                        <option value={role.title}> role.title </option>;}
                        ) : null
                      }
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                <label>Role</label>
                </div>
                <div className="input-field col s12">
                  <textarea className="validate materialize-textarea"
                      id="content"
                      name="content"
                      value={this.state.content}
                      onChange={this.handleFieldChange}
                  />
                <label className="active" htmlFor="content">Content</label>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <div className="container">
              <button className="btn modal-action modal-close waves-effect blue right"
                  onClick={this.handleSubmit}
              >
                update
              </button>
              <button className="btn modal-action modal-close waves-effect red accent-2 left">
                cancel
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  module.exports = DocEdit;

})();
