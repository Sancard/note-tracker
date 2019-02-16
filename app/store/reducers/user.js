import { USER_LOGOUT_USER, USER_SAVE_USER } from '../actions/actionTypes';


const initialState = {
  user: {},
  isLogged: false,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_SAVE_USER: {
      localStorage.setItem('userInfo', JSON.stringify(action.user));
      localStorage.setItem('isLogged', true);
      return {...state, user: action.user, isLogged: true}
    }
    case USER_LOGOUT_USER: {
      localStorage.setItem('userInfo', null);
      localStorage.setItem('isLogged', false);
      return {...state, user: null, isLogged: false}
    }
    default: {
      return state;
    }
  }

};

export default reducer;
