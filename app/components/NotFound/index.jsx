(() => {

  let React = require('react');

  class NotFound extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div className="container">
          <div className="card-panel">
            <div className="row">
              <h2 className="header center-align">Not Found</h2>
            </div>
            <div className="row">
              <p className="flow-text center-align">
                Sorry. This is not the page you were looking for
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  module.exports = NotFound;

})();
