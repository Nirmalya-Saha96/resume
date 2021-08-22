import React from 'react';
import PropTypes from 'prop-types';

const Links = ({
  quickLinks: {
    title,
    link
  }
}) => {


  return (
    <div>
      <h3 className='text-dark'>{title}</h3>
      <a href={link} target="_blank" rel='noopener noreferrer'>
        <strong className='btn btn-primary'>View</strong>
      </a>
    </div>
  );
}

Links.propTypes = {
  quickLinks: PropTypes.array.isRequired
}

export default Links;
