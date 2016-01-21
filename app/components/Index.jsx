(() => {
  'use strict';

  let React = require('react');

  class Index extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
          <h1>Hello World</h1>
      );
    }
  }

  module.exports = Index;

})();
