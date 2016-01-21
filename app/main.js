(() => {
  'use strict';

  let React = require('react');
  let ReactDOM = require('react-dom');
  let Index = require('./components/Landing/index.jsx');

  ReactDOM.render(<Index /> , document.getElementById('header'));
  // ReactDOM.render(<Index /> , document.getElementById('contain'));
})();
