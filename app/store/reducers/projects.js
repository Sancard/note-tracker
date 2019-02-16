import { PROJECT_DELETE_PROJECT, PROJECT_LOADING_FROM_CLOUD, PROJECT_NEW_PROJECT } from '../actions/actionTypes';
import { saveProject, projectStore, convertValues, deleteProject } from '../../utils/storage';

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
    case PROJECT_DELETE_PROJECT: {
      const projects = state.projects.filter((el) => el.uuid !== action.project.uuid);
      deleteProject(action.project.uuid);
      return { ...state, projects };
    }
    case PROJECT_LOADING_FROM_CLOUD: {
      const projects = state.projects.filter((el) => el.uuid !== action.project.uuid).concat(action.project);
      saveProject(action.project.uuid, action.project);
      return { ...state, projects };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
