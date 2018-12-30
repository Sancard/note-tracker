// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import tasksStore from './tasks';
import projectsStore from './projects';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    tasksStore,
    projectsStore
  });
}
