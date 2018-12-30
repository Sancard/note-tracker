import { PROJECT_NEW_PROJECT } from '../actions/actionTypes';
import { saveProject, projectStore, convertValues } from '../../utils/storage';

const initialState = {
  projects: projectStore.store ? convertValues(projectStore.store) : []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_NEW_PROJECT: {
      const projects = state.projects.concat(action.project);
      saveProject(action.project.uuid, action.project);
      return { ...state, projects };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
