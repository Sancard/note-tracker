import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import Tasks from './containers/Viewer/Viewer';
import TaskCreator from './containers/TaskCreator/TaskCreator';
import Task from './containers/Task/Task';
import ProjectCreator from './containers/ProjectCreator/ProjectCreator';

export default () => (
  <App>
    <Switch>
      <Route path={routes.PROJECT_CREATOR} component={ProjectCreator} />
      <Route path={routes.TASK_CREATOR} component={TaskCreator} />
      <Route path={routes.TASK} component={Task} />
      <Route path={routes.HOME} component={Tasks} />
    </Switch>
  </App>
);
