import { TASK_DELETE_TASK, TASK_LOADING_FROM_CLOUD, TASK_NEW_TASK, TASK_UPDATE_TASK } from '../actions/actionTypes';
import { saveTask, taskStore, convertValues, deleteTask } from '../../utils/storage';

const initialState = {
  tasks: taskStore.store ? convertValues(taskStore.store) : []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_NEW_TASK: {
      const tasks = state.tasks.concat(action.task);
      // save data to file
      saveTask(action.task.uuid, action.task);
      // return state to redux store
      return { ...state, tasks };
    }
    case TASK_UPDATE_TASK: {
      saveTask(action.task.uuid, action.task);
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          let taskSnap = task;
          if (task.uuid === action.task.uuid) {
            taskSnap = action.task;
          }
          return taskSnap;
        })
      };
    }
    case TASK_DELETE_TASK: {
      deleteTask(action.task.uuid);
      const tasks = state.tasks.filter((el) => el.uuid !== action.task.uuid);
      return {...state, tasks}
    }
    case TASK_LOADING_FROM_CLOUD: {
      const tasks = state.tasks.filter((el) => el.uuid !== action.task.uuid).concat(action.task);
      saveTask(action.task.uuid, action.task);
      return { ...state, tasks };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
