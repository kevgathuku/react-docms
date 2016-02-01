(() => {
  'use strict';

  let React = require('react');

  class SideNav extends React.Component {
    constructor() {
      super();

    }

    render() {
      return (
        <div>
          <ul className="right hide-on-med-and-down side-nav fixed">
            <li>
              <a href="#!">First Sidebar Link</a>
            </li>
            <li>
              <a href="#!">Second Sidebar Link</a>
            </li>
          </ul>
          <ul id="slide-out" className="side-nav">
            <li>
              <a href="#!">First Sidebar Link</a>
            </li>
            <li>
              <a href="#!">Second Sidebar Link</a>
            </li>
          </ul>
          <a href="#" className="button-collapse" data-activates="slide-out" >
            <i className="mdi-navigation-menu"></i>
          </a>
        </div>
      );
    }
  }

  module.exports = SideNav;

})();
