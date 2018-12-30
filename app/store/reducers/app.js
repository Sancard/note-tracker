import { APP_UPDATE_PROJECT_UUID } from '../actions/actionTypes';

const initialState = {
  projectUuid: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_UPDATE_PROJECT_UUID: {
      const projectUuid = action.projectUuid;
      return {...state, projectUuid}
    }
    default: {
      return state;
    }
  }
};

export default reducer;
