import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const About = ({ profile: {
  bio,
  skills,
  user: { name }
}}) => {
  return (
      <div className="profile-about bg-light p-2 ">
      {
        bio && (
          <Fragment>
            <h2 className="text-red">{name} @ Bio</h2>
            <p className='p-display'>
              {bio}
            </p>
            <div className="line"></div>
          </Fragment>
        )
      }


        <h2 className="text-red">Skill Set</h2>
        <div className="skills">
          {skills.map((skill, index) => (
            <div key={index} className="p-1"><i className="fa fa-check"></i>{skill}</div>
          ))}
      </div>
    </div>
  );
}

About.propTypes = {
  profile: PropTypes.object.isRequired
}

export default About;
