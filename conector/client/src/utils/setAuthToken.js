import axios from 'axios';

//this is boiler plate code

//setting up the token
//and storing it in the header files to give to the server
//for loggin accesss
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

export default setAuthToken;
