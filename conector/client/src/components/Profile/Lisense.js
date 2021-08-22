import React from 'react';
import PropTypes from 'prop-types';

const Lisense = ({
  lisense: {
    title,
    organization,
    credential
  }
}) => {


  return (
    <div>
      <h3 className='text-dark'>{title}</h3>
      <p>
        <strong>Organization: </strong>{organization}
      </p>
      <a href={credential} target="_blank" rel='noopener noreferrer'>
        <strong className='btn btn-primary'>View</strong>
      </a>
    </div>
  );
}

Lisense.propTypes = {
  lisense: PropTypes.array.isRequired
}

export default Lisense;
