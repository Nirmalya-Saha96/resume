import React from 'react';
import PropTypes from 'prop-types';

const Award = ({
  awards: {
    title,
    des
  }
}) => {


  return (
    <div>
      <h3 className='text-dark'>{title}</h3>
      <p className='p-display'>
        <strong>Description: </strong>{des}
      </p>
    </div>
  );
}

Award.propTypes = {
  awards: PropTypes.array.isRequired
}

export default Award;
