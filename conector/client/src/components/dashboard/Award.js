import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAward } from '../../actions/profile';

const Award = ({ awards, deleteAward }) => {
  const award = awards.map(exp => (
    <tr key={exp._id}>
      <td>{exp.title}</td>
      <td className='hide-sm'>{exp.des}</td>
      <td>
        <button onClick={() => deleteAward(exp._id)} className='btn btn-danger'><i className='fas fa-trash-alt'></i> Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2 exph2'>My Awards/Achievements</h2>
      <table className='table nirmalya-table'>
        <thead className='tcolor'>
          <tr>
            <th>Title</th>
            <th className='hide-sm'>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{award}</tbody>
      </table>
    </Fragment>
  );
}

Award.propTypes = {
  awards: PropTypes.array.isRequired,
  deleteAward: PropTypes.func.isRequired
}

export default connect(null, { deleteAward })(Award);
