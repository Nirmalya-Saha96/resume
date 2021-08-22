import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/forms/CreateProfile';
import EditProfile from './components/forms/edit-profile';
import AddExperience from './components/forms/AddExperience';
import AddEducation from './components/forms/AddEducation';
import AddLisense from './components/forms/AddLisense';
import AddProject from './components/forms/AddProject';
import AddLinks from './components/forms/AddLinks';
import AddAward from './components/forms/AddAward';
import Profiles from './components/Profiles/Profiles';
import Jobs from './components/jobs/Jobs';
import Vedios from './Vedio';
import Blogs from './components/blogs/Blogs';
import Post from './components/post/Post';
import Job from './components/job/Job';
import Messenger from './chat/Messenger';
import Colaborate from './components/colaborate/Colaborate';
import Profile from './components/Profile/Profile';
import Posts from './components/posts/Posts';
import Codepen from './components/Codepen/Codepen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import './App.css';

//if token is not initialised set the token
//in browser localstorage
if(localStorage.token) {
  setAuthToken(localStorage.token);
}

//when the app is mount
//load the user to store the token if already logedin
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  },[]);

  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
         <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/create-profile' component={CreateProfile} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute exact path='/codepen' component={Codepen} />
            <PrivateRoute exact path='/add-experience' component={AddExperience} />
            <PrivateRoute exact path='/add-education' component={AddEducation} />
            <PrivateRoute exact path='/add-projects' component={AddProject} />
            <PrivateRoute exact path='/add-lisense' component={AddLisense} />
            <PrivateRoute exact path='/add-links' component={AddLinks} />
            <PrivateRoute exact path='/add-award' component={AddAward} />
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/profile/:id' component={Profile} />
            <PrivateRoute exact path='/posts' component={Posts} />
            <PrivateRoute exact path='/blogs' component={Blogs} />
            <PrivateRoute exact path='/jobs' component={Jobs} />
            <PrivateRoute exact path='/post/:id' component={Post} />
            <PrivateRoute exact path='/job/:id' component={Job} />
            <PrivateRoute exact path='/messenger' component={Messenger} />
            <PrivateRoute exact path='/colaborate' component={Colaborate} />
            <PrivateRoute exact path='/vedio' component={Vedios} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)};


export default App;
