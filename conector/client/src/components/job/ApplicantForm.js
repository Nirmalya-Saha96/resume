import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addApplicant } from '../../actions/job';

const ApplicantForm = ({ jobId, addApplicant }) => {
  const [formData, setFormData] = useState({
    text: '',
    urls: ''
  });

  const { text, urls } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addApplicant(jobId, formData);
    setFormData('');
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Add your application</h3>
      </div>
      <form className="form my-1" onSubmit={e => onSubmit(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Tell me about yourself"
          value={text}
          onChange={e => onChange(e)}
          required
        ></textarea>
        <br />
        <textarea
          name="urls"
          cols="30"
          rows="5"
          placeholder="Give your urls: resume, github, linkedIn, portfolio sites and relevant links"
          value={urls}
          onChange={e => onChange(e)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark" value="Submit" />
      </form>
    </div>
  );
}

ApplicantForm.propTypes = {
  addApplicant: PropTypes.func.isRequired
}

export default connect(null, { addApplicant })(ApplicantForm);
