(() => {
  'use strict';

  let React = require('react');
  let logoSrc = '../images/favicon.png';

  class NavBar extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <nav className="transparent black-text" role="navigation">
           <div className="nav-wrapper container">
             <a className="brand-logo brand-logo-small" href="/">
               <img alt="Docue Logo" id="header-logo" src={logoSrc}/>
                {'      Docue'}</a>
             <ul className="right hide-on-med-and-down" id="nav-mobile">
               <li><a href="#">Home</a></li>
               <li><a href="#">About</a></li>
               <li><a href="#">Login</a></li>
             </ul>
             <div className="row center hide-on-large-only" id="header-mobile-links">
                <div className="col s4">
                    <a href="/#">About</a>
                </div>
                <div className="col s4">
                    <a href="/#">Sign Up</a>
                </div>
                <div className="col s4">
                  <a href="#">Login</a>
                </div>
                <div className="col s12 spacer"></div>
              </div>
         </div>
       </nav>
      );
    }
  }

  module.exports = NavBar;

})();
