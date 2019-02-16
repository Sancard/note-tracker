import { TASK_DELETE_TASK, TASK_LOADING_FROM_CLOUD, TASK_NEW_TASK, TASK_UPDATE_TASK } from './actionTypes';
import { deleteUserDataFromDb, saveUserDataToDb } from '../../config/firebase';
import { COLLECTION_TASKS } from '../../config/firebase-env';

// to firebase store
export const taskNewTask = (task) => {
  return (dispatch, getState) => {
    const { userStore } = getState();
    saveUserDataToDb(task, userStore.user.uid, COLLECTION_TASKS).then(() => {
      dispatch(taskNewTaskRedux(task));
    });
  };
};

export const updateTask = (task) => {
  return (dispatch, getState) => {
    const { userStore } = getState();
    saveUserDataToDb(task, userStore.user.uid, COLLECTION_TASKS).then(() => {
      dispatch(updateTaskRedux(task));
    });
  };
};

export const deleteTask = (task) => {
  return (dispatch, getState) => {
    const { userStore } = getState();
    deleteUserDataFromDb(task, userStore.user.uid, COLLECTION_TASKS).then((res) => {
      console.log(res);
      dispatch(deleteTaskRedux(task));
    });
  };
};


// to redux store
export const taskNewTaskRedux = (task) => {
  return {
    type: TASK_NEW_TASK,
    task
  };
};

export const updateTaskRedux = (task) => {
  return {
    type: TASK_UPDATE_TASK,
    task
  };
};

export const deleteTaskRedux = (task) => {
  return {
    type: TASK_DELETE_TASK,
    task
  };
};

//cloud
export const taskLoadFromCloud = (task) => {
  return {
    type: TASK_LOADING_FROM_CLOUD,
    task
  };
};


