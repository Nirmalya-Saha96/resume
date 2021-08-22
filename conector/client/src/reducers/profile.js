import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES } from '../actions/types';

//initialising the state with profile object an empty profiles array loading an empty errors array
const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
}

//receiving the initialState and the action
export default function(state = initialState, action) {
  const { type, payload } = action;

  //GET_PROFILE and UPDATE_PROFILE with the state of profile of my
  //GET_PROFILES stores all the profiles in the profiles array
  //CLEAR_PROFILE removes my profile and errors
  //PROFILE_ERROR stores the errors
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        error: {}
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}
