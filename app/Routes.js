import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage/HomePage';
import TaskCreator from './containers/TaskCreator/TaskCreator';
import Task from './containers/Task/Task';

export default () => (
  <App>
    <Switch>
      <Route path={routes.TASK_CREATOR} component={TaskCreator} />
      <Route path={routes.TASK} component={Task} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
