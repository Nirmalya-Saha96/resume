import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/profile';

const Project = ({ projects, deleteProject }) => {
  const project = projects.map(exp => (
    <tr key={exp._id}>
      <td>{exp.title}</td>
      <td className='hide-sm'>{exp.about}</td>
      <td className='hide-sm'>{exp.link}</td>
      <td>
        <button onClick={() => deleteProject(exp._id)} className='btn btn-danger'><i className='fas fa-trash-alt'></i> Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2 exph2'>My Project</h2>
      <table className='table nirmalya-table'>
        <thead className='tcolor'>
          <tr>
            <th>Title</th>
            <th className='hide-sm'>About</th>
            <th className='hide-sm'>Link</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{project}</tbody>
      </table>
    </Fragment>
  );
}

Project.propTypes = {
  projects: PropTypes.array.isRequired,
  deleteProject: PropTypes.func.isRequired
}

export default connect(null, { deleteProject })(Project);
