import { SET_ALERT, REMOVE_ALERT } from './types';
import {v4 as uuid} from 'uuid';

//function to set an aler by receiving the alert message and alert type
//and returns the payload as alert in reducer by mentioning the type as set alert
export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }),3000);
};
