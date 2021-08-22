import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

//stating the initialstate as an empty array
const initialState = [];

//receives the action ans initialState
function alertReducer(state = initialState, action) {
  //destructing the type and payload from actions
  const { type, payload } = action;

  //returns the alert in form of updated array from the end
  //in REMOVE_ALERT it updates the alert array except the id received from the action
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}

export default alertReducer;
