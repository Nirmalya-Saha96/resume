import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Experience = ({
  experience: {
    company,
    title,
    location,
    current,
    to,
    form,
    description
  }
}) => {


  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        <Moment format='YYYY-MM-DD'>{form}</Moment> -{' '} {!to ? 'Current' : <Moment format='YYYY-MM-DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>{title}
      </p>
      <p>
        <strong>Description: </strong>{description}
      </p>

    </div>
  );
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired
}

export default Experience;
