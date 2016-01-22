(() => {
  'use strict';

  let React = require('react'),
      ReactDOM = require('react-dom'),
      ReactRouter = require('react-router'),
      IndexRoute = ReactRouter.IndexRoute,
      Route = ReactRouter.Route,
      Router = ReactRouter.Router,
      browserHistory = ReactRouter.browserHistory,
      Landing = require('./components/Landing/index.jsx'),
      Main = require('./components/Landing/Main.jsx'),
      Authenticate = require('./components/Authenticate/index.jsx');

  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={Main} >
        <IndexRoute component={Landing} />
        <Route path="/auth" component={Authenticate} />
      </Route>
    </Router>), document.getElementById('content'));
})();
