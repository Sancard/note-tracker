import { USER_LOGOUT_USER, USER_SAVE_DATA, USER_SAVE_USER } from './actionTypes';

export const userSaveUser = (user) => {
  return {
    type: USER_SAVE_USER,
    user
  }
};

export const userLogoutUser = () => {
  return {
    type: USER_LOGOUT_USER
  }
};

// FIREBASE interaction
export const saveUserData = (data) => {
  return {
    type: USER_SAVE_DATA,
    data
  }
};
