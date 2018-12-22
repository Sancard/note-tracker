import { TASK_NEW_TASK } from '../actions/actionTypes';

const initialState = {
  tasks: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_NEW_TASK: {
      const tasks = state.tasks.concat(action.task);
      return {...state, tasks};
    }
    default: {
      return state;
    }
  }
};

export default reducer;
