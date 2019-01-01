import { TASK_DELETE_TASK, TASK_NEW_TASK, TASK_UPDATE_TASK } from './actionTypes';

export const taskNewTask = (task) => {
  return {
    type: TASK_NEW_TASK,
    task
  };
};

export const updateTask = (task) => {
  return {
    type: TASK_UPDATE_TASK,
    task
  }
};

export const deleteTask = (task) => {
  return {
    type: TASK_DELETE_TASK,
    task
  }
};


