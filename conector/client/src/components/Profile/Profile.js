import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import Top from './Top';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import Projects from './Projects';
import Lisense from './Lisense';
import Links from './Links';
import Award from './Award';
import Post from './Post';
import Job from './Job';


const Profile = ({ match, profile: { profile, loading }, auth, getProfileById }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return(
    <Fragment>
      { profile === null || loading ? <Loader /> : <Fragment>
        { auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
          <Link to='edit-profile' className='btn btn-dark'>Edit Profile</Link>
        )}
        <Top profile={profile} />
        <div class="profile-grid my-1">

          <About profile={profile} />
          <div className='profile-exp bg-light p-2'>
            <h2 className='text-red'>Experience</h2>
            {profile.experience.length > 0 ? (<Fragment>
              {profile.experience.map(experience => (
                <Experience key={experience.id} experience={experience} />
              ))}
            </Fragment>) : <h4>No Experience</h4>}
          </div>
          <div className='profile-edu bg-light p-2'>
            <h2 className='text-red'>Education</h2>
            {profile.education.length > 0 ? (<Fragment>
              {profile.education.map(education => (
                <Education key={education.id} education={education} />
              ))}
            </Fragment>) : <h4>No Education</h4>}
          </div>
          <div className='profile-github bg-light p-2'>
            <h2 className='text-red'>Projects</h2>
            {profile.projects.length > 0 ? (<Fragment>
              {profile.projects.map(project => (
                <Projects key={project.id} projects={project} />
              ))}
            </Fragment>) : <h4>No Projects</h4>}
          </div>
          <div className='profile-lisense bg-light p-2'>
            <h2 className='text-red'>Certificates/Lisense</h2>
            {profile.lisense.length > 0 ? (<Fragment>
              {profile.lisense.map(lisense => (
                <Lisense key={lisense.id} lisense={lisense} />
              ))}
            </Fragment>) : <h4>No Certificates/Lisense</h4>}
          </div>
          <div className='profile-links bg-light p-2'>
            <h2 className='text-red'>QuickLinks/Portfolio</h2>
            {profile.quickLinks.length > 0 ? (<Fragment>
              {profile.quickLinks.map(lisense => (
                <Links key={lisense.id} quickLinks={lisense} />
              ))}
            </Fragment>) : <h4>No QuickLinks/Portfolio</h4>}
          </div>
          <div className='profile-award bg-light p-2'>
            <h2 className='text-red'>Awards/Achievements</h2>
            {profile.awards.length > 0 ? (<Fragment>
              {profile.awards.map(lisense => (
                <Award key={lisense.id} awards={lisense} />
              ))}
            </Fragment>) : <h4>No Awards/Achievements</h4>}
          </div>
          <div className='profile-post bg-light p-2'>
            <h2 className='text-red'>Activity</h2>
            {profile.posts.length > 0 ? (<Fragment>
              {profile.posts.map(lisense => (
                <Post key={lisense.id} posts={lisense} />
              ))}
            </Fragment>) : <h4>No Activity</h4>}
          </div>
          <div className='profile-job bg-light p-2'>
            <h2 className='text-red'>Jobs Listed</h2>
            {profile.jobs.length > 0 ? (<Fragment>
              {profile.jobs.map(lisense => (
                <Job key={lisense.id} jobs={lisense} />
              ))}
            </Fragment>) : <h4>No Jobs Listed</h4>}
          </div>
        </div>
      </Fragment>}
    </Fragment>
  );
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile);
