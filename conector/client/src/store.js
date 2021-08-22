import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from "redux";

//creating the redux store
//this all are the boiler plate code

//setting the initial state as empty
const initialState = {};

const middleware = [thunk];

//creating the store with rootreducers initialState and applying middleware
//to store all the states
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
