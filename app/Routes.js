import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import Viewer from './containers/Viewer/Viewer';
import Task from './containers/Task/Task';
import Login from './containers/Login/Login';
import requireAuth from './hoc/checkAuth';
import Settings from './containers/Settings/Settings';

export default () => (
  <App>
    <Switch>
      <Route path={routes.LOGIN} component={Login} />
      <Route path={routes.SETTINGS} component={requireAuth(Settings)} />
      <Route path={routes.TASK} component={requireAuth(Task)} />
      <Route path={routes.HOME} component={requireAuth(Viewer)} />
    </Switch>
  </App>
);
