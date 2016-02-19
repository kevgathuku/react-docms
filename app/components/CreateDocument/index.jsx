(() => {
  'use strict';

  let React = require('react'),
    Select = require('react-select'),
    browserHistory = require('react-router').browserHistory,
    DocActions = require('../../actions/DocActions'),
    DocStore = require('../../stores/DocStore'),
    RoleActions = require('../../actions/RoleActions'),
    RoleStore = require('../../stores/RoleStore');

  class CreateDocument extends React.Component {

    constructor() {
      super();
      this.state = {
        token: localStorage.getItem('user'),
        title: null,
        content: null,
        role: null,
        roles: null
      };
    }

    componentDidMount() {
      RoleActions.getRoles(this.state.token);
      DocStore.addChangeListener(this.handleDocumentCreateResult);
      RoleStore.addChangeListener(this.handleRolesResult);
    }

    componentWillUnmount() {
      DocStore.removeChangeListener(this.handleDocumentCreateResult);
      RoleStore.removeChangeListener(this.handleRolesResult);
    }

    handleDocumentCreateResult = () => {
      let data = DocStore.getDocCreateResult();
      if (data) {
        if (data.error) {
          window.Materialize.toast(data.error, 2000, 'error-toast');
        } else {
          window.Materialize.toast('Document created successfully!', 2000, 'success-toast');
          browserHistory.push('/dashboard');
        }
      }
    };

    handleRolesResult = () => {
      let roles = RoleStore.getRoles();
      this.setState({roles: roles});
    };

    handleSubmit = (event) => {
      event.preventDefault();
      if (!this.state.role) {
        window.Materialize.toast('Please Select a Role', 2000, 'error-toast');
      }
      let documentPayload = {
        title: this.state.title,
        content: this.state.content,
        role: this.state.role.title
      };
      DocActions.createDoc(documentPayload, this.state.token);
    };

    handleFieldChange = (event) => {
      // A function bound to the event object
      let stateObject = function() {
        let returnObj = {};
        returnObj[this.target.name] = this.target.value;
        return returnObj;
      }.bind(event)();

      this.setState(stateObject);
    };

    getOptions = (input, callback) => {
      setTimeout(() => {
        callback(null, {
          options: this.state.roles,
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
        <div className="container">
          <div className="row">
            <h2 className="header center-align">Create Document</h2>
          </div>
          <div className="row">
            <form className="col s12" onSubmit={this.handleSubmit}>
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
                  <label className="active" htmlFor="role">Role</label>
                  <Select.Async style={{top: 10}}
                      labelKey="title"
                      valueKey="_id"
                      loadOptions={this.getOptions}
                      name="role"
                      options={this.state.options}
                      onChange={this.handleSelectChange}
                      placeholder="Select Role"
                      value={this.state.role}
                      searchable={false}
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
                <div className="col s12">
                  <div className="container center">
                    <button className="btn waves-effect header-btn blue"
                        name="action"
                        type="submit"
                    > submit
                    </button>
                  </div>
                </div>
              </form>
          </div>
        </div>
      );
    }
  }

  module.exports = CreateDocument;

})();
