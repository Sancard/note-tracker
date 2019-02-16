// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import tasksStore from './tasks';
import projectsStore from './projects';
import appStore from './app';
import userStore from './user';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    tasksStore,
    projectsStore,
    appStore,
    userStore
  });
}
