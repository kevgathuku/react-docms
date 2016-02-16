(() => {
  'use strict';

  let React = require('react'),
      ReactDOM = require('react-dom'),
      ReactRouter = require('react-router'),
      IndexRoute = ReactRouter.IndexRoute,
      Route = ReactRouter.Route,
      Router = ReactRouter.Router,
      browserHistory = ReactRouter.browserHistory,
      CreateDocument = require('./components/CreateDocument/index.jsx'),
      DocumentPage = require('./components/DocumentPage/index.jsx'),
      Dashboard = require('./components/Dashboard/index.jsx'),
      Landing = require('./components/Landing/index.jsx'),
      ProfileEdit = require('./components/ProfileEdit/index.jsx'),
      Main = require('./components/Landing/Main.jsx'),
      Auth = require('./components/Auth/index.jsx');

  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={Main} >
        <IndexRoute component={Landing} />
        <Route path="/auth" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile/edit" component={ProfileEdit} />
        <Route path="/documents/create" component={CreateDocument} />
        <Route path="/documents/:id" component={DocumentPage} />
      </Route>
    </Router>), document.getElementById('content'));
})();
