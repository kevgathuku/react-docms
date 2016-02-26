(() => {
  'use strict';

  let React = require('react'),
      Select = require('react-select'),
      DocActions = require('../../actions/DocActions'),
      DocStore = require('../../stores/DocStore');

  class DocEdit extends React.Component {
    static propTypes = {
      doc: React.PropTypes.object,
      roles: React.PropTypes.arrayOf(React.PropTypes.object),
      updateDoc: React.PropTypes.func
    };

    constructor(props) {
      super(props);

      this.state = {
        token: localStorage.getItem('user'),
        title: this.props.doc.title,
        content: this.props.doc.content,
        role: this.props.doc.role,
        options: []
      };
    }

    componentDidMount() {
      DocStore.addChangeListener(this.handleEditResult, 'editDoc');
    }

    componentWillUnmount() {
      DocStore.removeChangeListener(this.handleEditResult, 'editDoc');
    }

    handleFieldChange = (event) => {
      // A function bound to the event object
      let stateObject = function() {
        let returnObj = {};
        returnObj[this.target.name] = this.target.value;
        return returnObj;
      }.bind(event)();

      this.setState(stateObject);
    };

    handleSubmit = (event) => {
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
    };

    handleEditResult = () => {
      let result = DocStore.getDocEditResult();
      if (result && result.data._id === this.props.doc._id) {
        if (result.statusCode === 200) {
          this.props.updateDoc(result.data);
          window.Materialize.toast('Document Updated!', 4000);
        } else {
          window.Materialize.toast(result.error, 2000, 'error-toast');
        }
      }
    };

    getOptions = (input, callback) => {
      setTimeout(() => {
        callback(null, {
          options: this.props.roles,
          // CAREFUL! Only set this to true when there are no more options,
          // or more specific queries will not be sent to the server.
          complete: true
        });
      }, 1000);
    };

    handleSelectChange = (val) => {
      this.setState({
        role: val
      });
    };

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
                  <Select.Async style={{top: 10}}
                      labelKey="title"
                      valueKey="_id"
                      loadOptions={this.getOptions}
                      name="role"
                      options={this.state.options}
                      onChange={this.handleSelectChange}
                      placeholder="Select Role"
                      value={this.state.role}
                  />
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
