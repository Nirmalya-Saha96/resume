import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    form: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDate, setToDate] = useState(false);

  const { company, title, location, form, to, current, description } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addExperience(formData, history);
  }



  return (
    <Fragment>
      <h1 class="large text-primary">
       Add Your Experience
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming/business
        positions that you have had in the past or currently working on
      </p>

      <hr />
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
        </div>
        <div class="form-group nirmalya-hover">
          <h4>From</h4>
          <input type="date" name="from" value={form} onChange={e => onChange(e)} />
        </div>
         <div class="form-group nirmalya-hover">
          <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {setFormData({ ...formData, current: !current}); setToDate(!toDate) }} /> {' '} Current Job/Business</p>
        </div>
        <div class="form-group nirmalya-hover">
          <h4>To</h4>
          <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDate ? 'disabled' : ''}/>
        </div>
        <div class="form-group nirmalya-hover">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">Back</Link>
      </form>
      <small>* = required field</small>
    </Fragment>
  );
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience));
