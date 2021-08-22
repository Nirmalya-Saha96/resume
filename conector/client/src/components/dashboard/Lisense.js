import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteLisense } from '../../actions/profile';

const Lisense = ({ lisense, deleteLisense }) => {
  const lis = lisense.map(exp => (
    <tr key={exp._id}>
      <td>{exp.title}</td>
      <td className='hide-sm'>{exp.organization}</td>
      <td className='hide-sm'>{exp.credential}</td>
      <td>
        <button onClick={() => deleteLisense(exp._id)} className='btn btn-danger'><i className='fas fa-trash-alt'></i> Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2 exph2'>My Certificates/Lisense</h2>
      <table className='table nirmalya-table'>
        <thead className='tcolor'>
          <tr>
            <th>Title</th>
            <th className='hide-sm'>Organization</th>
            <th className='hide-sm'>Credentials</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{lis}</tbody>
      </table>
    </Fragment>
  );
}

Lisense.propTypes = {
  lisense: PropTypes.array.isRequired,
  deleteLisense: PropTypes.func.isRequired
}

export default connect(null, { deleteLisense })(Lisense);
