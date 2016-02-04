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

    componentDidMount() {
      // Activate the materialize tooltips
      window.$('.tooltipped').each(function() {
        window.$(this).tooltip({'delay': 50});
      });
    }

    render() {
      let renderDoc = function(doc) {
        return (
          <div className="col s12 m6 l4" key={doc._id}>
            <div className="card">
              <div className="card-image">
                <img src="http://lorempixel.com/484/363/" />
              </div>
              <div className="card-content">
                <h5>{doc.title}</h5>
                <p>Creator: {`${doc.ownerId.name.first} ${doc.ownerId.name.last}`}</p>
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
