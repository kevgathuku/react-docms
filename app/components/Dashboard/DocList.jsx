{
  'use strict';

  var React = require('react');

  class DocList extends React.Component {
    static propTypes = {
      docs: React.PropTypes.arrayOf(React.PropTypes.object)
    };

    constructor(props) {
      super(props);
    }

    render() {
      let renderDoc = function(doc) {
        return (
          <div className="col s12 m6 l4" key={doc._id}>
            <div className="card">
              <div className="card-image">
                <img src="http://lorempixel.com/484/363/" />
                <span className="card-title">{doc.title}</span>
              </div>
              <div className="card-content">
                <p>I am a very simple card. This will contain the doc's content preview.
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
      return (<div>{this.props.docs.map(renderDoc)}</div>);
    }
  }
  module.exports = DocList;

}
