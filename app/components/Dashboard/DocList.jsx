{
  'use strict';

  let React = require('react'),
    cardImage = require('../../images/abstract.jpeg');

  class DocList extends React.Component {

    static propTypes = {
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
      // The document has finished loading and the document has been parsed
      // Credit: jamestease (http://bit.ly/29HSeYl)
      if (document.readyState === 'interactive') {
        // Activate the materialize tooltips
        window.$('.tooltipped').tooltip();
      }
    }

    componentWillUnmount() {
      window.$('.tooltipped').tooltip('remove');
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
                    style={{position: 'relative', top: '-22px'}}
                    href={`/documents/${doc._id}`}
                >
                  <i className="material-icons">play_arrow</i>
                </a>
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
