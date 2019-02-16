import { PROJECT_DELETE_PROJECT, PROJECT_LOADING_FROM_CLOUD, PROJECT_NEW_PROJECT } from './actionTypes';
import { deleteUserDataFromDb, saveUserDataToDb } from '../../config/firebase';
import { COLLECTION_PROJECTS } from '../../config/firebase-env';


// to firebase store
export const projectNewProject = (project) => {
  return (dispatch, getState) => {
    const { userStore } = getState();
    saveUserDataToDb(project, userStore.user.uid, COLLECTION_PROJECTS).then(() => {
      dispatch(projectNewProjectRedux(project));
    });
  }
};

export const projectDeleteProject = (project) => {
  return (dispatch, getState) => {
    const { userStore } = getState();
    deleteUserDataFromDb(project, userStore.user.uid, COLLECTION_PROJECTS).then(() => {
      dispatch(projectDeleteProjectRedux(project));
    });
  }
};

// to reduxs store
export const projectNewProjectRedux = (project) => {
  return {
    type: PROJECT_NEW_PROJECT,
    project
  };
};

export const projectDeleteProjectRedux = (project) => {
  return {
    type: PROJECT_DELETE_PROJECT,
    project
  };
};

// cloud
export const projectLoadFromCloud = (project) => {
  return {
    type: PROJECT_LOADING_FROM_CLOUD,
    project
  };
};

