import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteProfile } from '../../actions/profile';
import Loader from '../layout/Loader';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Project from './Project';
import Lisense from './Lisense';
import Links from './Links';
import Award from './Award';


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return  loading && profile === null ? (
  <Loader /> ) : (
  <Fragment>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'>
      <i className='fas fa-user-circle'></i> Welcome { user && user.name } to your dashboard</p>
    { profile !== null ? (
      <Fragment>
        <Link to={`/profile/${user._id}`} className='btn btn-primary'>View Profile</Link>
        <DashboardActions />
        <hr />
        <Experience experience={profile.experience}/>
        <Education education={profile.education} />
        <Project projects={profile.projects} />
        <Lisense lisense={profile.lisense} />
        <Links quickLinks={profile.quickLinks} />
        <Award awards={profile.awards} />
        <div className='my-2'>
          <button onClick={() => deleteProfile()} className='btn btn-danger'><i className='fas fa-trash-alt'></i> Delete Profile</button>
        </div>
      </Fragment> ) : (
      <Fragment>
        <p>Sorry you dont have a profile, please click get profile to create your profile</p>
        <Link to='/create-profile' className='btn btn-primary my-1'>
          Create Profile
        </Link>
      </Fragment>
    )}
  </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteProfile } )(Dashboard);
