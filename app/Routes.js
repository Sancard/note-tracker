import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import routes from './constants/routes';
import App from './modules/App';
import Viewer from './modules/Viewer/Viewer';
import Task from './modules/Task/Task';
import Login from './modules/Login/Login';
import requireAuth from './hoc/checkAuth';
import Settings from './modules/Settings/Settings';

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
