import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, DELETE_ACCOUNT } from '../actions/types';

//setting up the initial state with token from the localstorage isautheticated  loading and user
//for furthur usages
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

//receives the initialState and the action
export default function(state = initialState, action) {
  //destructing the type and payload from the action
  const { type, payload } = action;

  //stores the user when user is loaded from the payload given by the action
  //when login and register success it stores the token in the localstorage
  //when logout it deletes the token from the localstorage and the state
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, ...payload, isAuthenticated: true, loading: false }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case DELETE_ACCOUNT:
      localStorage.removeItem('token');
      return { ...state, token: null, isAuthenticated: false, loading: false }
    default:
      return state;
  }
}
