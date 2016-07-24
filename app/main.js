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
    Auth = require('./components/Auth/index'),
    Admin = require('./components/Admin/index'),
    CreateDocument = require('./components/CreateDocument/index'),
    CreateRole = require('./components/CreateRole/index'),
    DocumentPage = require('./components/DocumentPage/index'),
    Dashboard = require('./components/Dashboard/index'),
    Landing = require('./components/Landing/index'),
    Profile = require('./components/Profile/index'),
    Main = require('./components/Landing/Main'),
    NotFound = require('./components/NotFound/index'),
    RolesAdmin = require('./components/RolesAdmin/index'),
    UsersAdmin = require('./components/UsersAdmin/index');

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
