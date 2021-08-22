import React from 'react';
import PropTypes from 'prop-types';

const Projects = ({
  projects: {
    title,
    link,
    about
  }
}) => {


  return (
    <div>
      <h3 className='text-dark'>{title}</h3>
      <p className='p-display'>
        <strong>Description: </strong>{about}
      </p>
      <a href={link} target="_blank" rel='noopener noreferrer'>
        <strong className='btn btn-primary'>View Project</strong>
      </a>
    </div>
  );
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired
}

export default Projects;
