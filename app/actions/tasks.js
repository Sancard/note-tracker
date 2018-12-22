import { TASK_NEW_TASK } from './actionTypes';

export const taskNewTask = (task) => {
  return {
    type: TASK_NEW_TASK,
    task
  };
};


