(() => {
  'use strict';

  let React = require('react');

  class Dashboard extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      let renderDoc = function(doc) {
        return (
          <div className="col s12 m6 l4" key={doc}>
            <div className="card">
              <div className="card-image">
                <img src="http://lorempixel.com/484/363/" />
                <span className="card-title">Doc Title</span>
              </div>
              <div className="card-content">
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div className="card-action">
                <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Details">
                  <i className="material-icons">info</i></a>
                <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit">
                  <i className="material-icons">mode_edit</i></a>
                <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Delete">
                  <i className="material-icons">delete</i></a>
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
              {[1, 2, 3, 4, 5, 6].map(renderDoc)}
          </div>
        </div>
      );
    }
  }

  module.exports = Dashboard;

})();
