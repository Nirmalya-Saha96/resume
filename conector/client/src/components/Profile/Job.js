import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Job = ({
  jobs: {
    _id,
    title,
    company,
    des
  }
}) => {


  return (
    <div>
      <h3 className='text-dark'>{title}</h3>
      <p>
        <strong>Company: </strong>{company}
      </p>
      <p>
        <strong>Description: </strong>{des}
      </p>
      <Link to={`/job/${_id}`} className='btn btn-primary'>View Job</Link>
    </div>
  );
}

Job.propTypes = {
  jobs: PropTypes.array.isRequired
}

export default Job;
