import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAward } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddAward = ({ addAward, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    des: ''
  });

  const { title, des } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addAward(formData, history);
  }



  return (
    <Fragment>
      <h1 class="large text-primary">
       Add Your Awards/Achievements
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add your awards and achievements for other developers to know more about
         what's going on in your life
      </p>

      <hr />
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="* Title" name="title" value={title} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group nirmalya-hover">
          <textarea
            name="des"
            cols="30"
            rows="3"
            placeholder="* A short description"
            value={des}
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

AddAward.propTypes = {
  addAward: PropTypes.func.isRequired
}

export default connect(null, { addAward })(withRouter(AddAward));
