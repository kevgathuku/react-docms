{
  'use strict';

  let React = require('react'),
      cardImage = require('../../images/abstract.jpeg');

  class DocList extends React.Component {

    static propTypes = {
      deleteDoc: React.PropTypes.func,
      docs:  React.PropTypes.arrayOf(React.PropTypes.object)
    };

    constructor(props) {
      super(props);

      this.state = {
        docs: this.props.docs,
        deletedDoc: null,
        token: localStorage.getItem('user')
      };
    }

    componentDidMount() {
      // Activate the materialize tooltips
      setTimeout(function() {
        window.$('.tooltipped').each(function() {
          window.$(this).tooltip({'delay': 50});
        });
      }, 1000);
    }

    render() {
      let renderDoc = function(doc) {
        return (
          <div className="col s12 m6 l4" key={doc._id}>
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
