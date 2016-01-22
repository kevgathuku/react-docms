(() => {
  'use strict';

  let React = require('react'),
      ReactDOM = require('react-dom'),
      ReactRouter = require('react-router'),
      IndexRoute = ReactRouter.IndexRoute,
      Route = ReactRouter.Route,
      Router = ReactRouter.Router,
      browserHistory = ReactRouter.browserHistory,
      Landing = require('./components/Landing/index.jsx');

  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={Landing} >
        <IndexRoute component={Landing} />
      </Route>
    </Router>) , document.getElementById('content'));
})();
