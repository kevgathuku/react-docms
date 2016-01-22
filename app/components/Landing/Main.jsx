(function() {
  'use strict';
  var React = require('react');

  class Main extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div id="hero">
          <div className="container" id="hero-text-container">
            <div className="row">
              <div className="col s12 center-align">
                <h1 id="hero-title" itemProp="description">
                  <span className="bold" >{'Docue    '}</span>
                  <span className="thin">
                    is the simplest way for <br />
                  anyone to manage their documents online </span>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div className="center-align">
                  <a className="btn btn-large create-list-link hero-btn" href="#"> Get Started
                  </a>
                  <a className="btn btn-large white grey-text hero-btn" href="#">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  module.exports = Main;
})();
