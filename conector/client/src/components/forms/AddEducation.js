import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    form: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDate, setToDate] = useState(false);

  const { school, degree, fieldofstudy, form, to, current, description } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addEducation(formData, history);
  }



  return (
    <Fragment>
      <h1 class="large text-primary">
       Add Your Education
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any school and college you have studied for others developers to
        know more about you. and can find your alumini.
      </p>

      <hr />
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="* Institue/School/College Name" name="school" value={school} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="* Degree or subjects" name="degree" value={degree} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
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
            placeholder="What you have done in your studytime"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation));
