(() => {
  'use strict';

  let React = require('react'),
      ReactDOM = require('react-dom'),
      ReactRouter = require('react-router'),
      IndexRoute = ReactRouter.IndexRoute,
      Redirect = ReactRouter.Redirect,
      Route = ReactRouter.Route,
      Router = ReactRouter.Router,
      browserHistory = ReactRouter.browserHistory,
      Auth = require('./components/Auth/index.jsx'),
      Admin = require('./components/Admin/index.jsx'),
      CreateDocument = require('./components/CreateDocument/index.jsx'),
      CreateRole = require('./components/RolesAdmin/CreateRole.jsx'),
      DocumentPage = require('./components/DocumentPage/index.jsx'),
      Dashboard = require('./components/Dashboard/index.jsx'),
      Landing = require('./components/Landing/index.jsx'),
      Profile = require('./components/Profile/index.jsx'),
      Main = require('./components/Landing/Main.jsx'),
      NotFound = require('./components/NotFound/index.jsx'),
      RolesAdmin = require('./components/RolesAdmin/index.jsx'),
      UsersAdmin = require('./components/UsersAdmin/index.jsx');

  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={Main} >
        <IndexRoute component={Landing} />
        <Route path="auth" component={Auth} />
        <Route path="admin" component={Admin} />
        <Route path="admin/roles" component={RolesAdmin} />
        <Route path="admin/users" component={UsersAdmin} />
        <Route path="admin/roles/create" component={CreateRole} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="documents/create" component={CreateDocument} />
        <Route path="documents/:id" component={DocumentPage} />
        <Route path="profile" component={Profile} />
        <Route path="404" component={NotFound} />
        <Redirect from="*" to="404" />
      </Route>
    </Router>), document.getElementById('content'));
})();
