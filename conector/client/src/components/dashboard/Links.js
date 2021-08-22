import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteLinks } from '../../actions/profile';

const Links = ({ quickLinks, deleteLinks }) => {
  const link = quickLinks.map(exp => (
    <tr key={exp._id}>
      <td>{exp.title}</td>
      <td className='hide-sm'>{exp.link}</td>
      <td>
        <button onClick={() => deleteLinks(exp._id)} className='btn btn-danger'><i className='fas fa-trash-alt'></i> Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2 exph2'>My Portfolio/Links</h2>
      <table className='table nirmalya-table'>
        <thead className='tcolor'>
          <tr>
            <th>Title</th>
            <th className='hide-sm'>Links</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{link}</tbody>
      </table>
    </Fragment>
  );
}

Links.propTypes = {
  quickLinks: PropTypes.array.isRequired,
  deleteLinks: PropTypes.func.isRequired
}

export default connect(null, { deleteLinks })(Links);
