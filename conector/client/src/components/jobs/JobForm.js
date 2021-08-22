import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addJob } from '../../actions/job';

const JobForm = ({ addJob }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    des: ''
  });

  const { title, company, des } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addJob(formData);
    setFormData('');
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Find your Employee</h3>
      </div>
      <form className="form my-1" onSubmit={e => onSubmit(e)}>
        <input type="text" placeholder="* Title" name="title" value={title} onChange={e => onChange(e)} required />
        <input type="text" placeholder="* Company" name="company" value={company} onChange={e => onChange(e)} required />
        <br />
        <textarea
          name="des"
          cols="30"
          rows="5"
          placeholder="* Job Description"
          value={des}
          onChange={e => onChange(e)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark" value="Submit" />
      </form>
    </div>
  );
}

JobForm.propTypes = {
  addJob: PropTypes.func.isRequired
}

export default connect(null, { addJob })(JobForm);
