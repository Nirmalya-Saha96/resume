import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(exp => (
    <tr key={exp._id}>
      <td>{exp.school}</td>
      <td className='hide-sm'>{exp.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.form}</Moment> - {
          exp.to === null ? ('Current') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
        }
      </td>
      <td>
        <button onClick={() => deleteEducation(exp._id)} className='btn btn-danger'><i className='fas fa-trash-alt'></i> Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2 exph2'>My Education</h2>
      <table className='table nirmalya-table'>
        <thead className='tcolor'>
          <tr>
            <th>Institute</th>
            <th className='hide-sm'>Degree</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);
