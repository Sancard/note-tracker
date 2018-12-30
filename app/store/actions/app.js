import { APP_UPDATE_PROJECT_UUID } from './actionTypes';

export const appUpdateProjectUuid = (projectUuid) => {
  return {
    type: APP_UPDATE_PROJECT_UUID,
    projectUuid
  };
};



