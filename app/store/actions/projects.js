import { PROJECT_DELETE_PROJECT, PROJECT_NEW_PROJECT } from './actionTypes';

export const projectNewProject = (project) => {
  return {
    type: PROJECT_NEW_PROJECT,
    project
  };
};

export const projectDeleteProject = (project) => {
  return {
    type: PROJECT_DELETE_PROJECT,
    project
  };
};


