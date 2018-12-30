import { PROJECT_NEW_PROJECT } from './actionTypes';

export const projectNewProject = (project) => {
  return {
    type: PROJECT_NEW_PROJECT,
    project
  };
};


