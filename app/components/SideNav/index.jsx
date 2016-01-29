(() => {
  'use strict';

  let React = require('react');

  class SideNav extends React.Component {
    constructor() {
      super();

    }

    render() {
      return (
        <nav>
          <ul className="right hide-on-med-and-down">
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
        </nav>
      );
    }
  }

  module.exports = SideNav;

})();
