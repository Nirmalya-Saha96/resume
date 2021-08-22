import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Education = ({
  education: {
    school,
    degree,
    fieldofstudy,
    current,
    to,
    form,
    description
  }
}) => {


  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        <Moment format='YYYY-MM-DD'>{form}</Moment> -{' '} {!to ? 'Current' : <Moment format='YYYY-MM-DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>{degree}
      </p>
      <p>
        <strong>Field of study: </strong>{fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>{description}
      </p>

    </div>
  );
}

Education.propTypes = {
  education: PropTypes.array.isRequired
}

export default Education;
