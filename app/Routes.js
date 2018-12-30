import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import Tasks from './containers/Viewer/Viewer';
import Task from './containers/Task/Task';

export default () => (
  <App>
    <Switch>
      <Route path={routes.TASK} component={Task} />
      <Route path={routes.HOME} component={Tasks} />
    </Switch>
  </App>
);
