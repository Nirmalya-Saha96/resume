import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProjects } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddProjects = ({ addProjects, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    about: '',
    link: ''
  });

  const { title, about, link } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addProjects(formData, history);
  }



  return (
    <Fragment>
      <h1 class="large text-primary">
       Add Your Projects
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add your projects/research work and tell it in brief and add the url
         for other people to see.
      </p>

      <hr />
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="* Title" name="title" value={title} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group nirmalya-hover">
          <textarea
            name="about"
            cols="30"
            rows="5"
            placeholder="Brief about your projects"
            value={about}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="* Link" name="link" value={link} onChange={e => onChange(e)} />
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">Back</Link>
      </form>
      <small>* = required field</small>
    </Fragment>
  );
}

AddProjects.propTypes = {
  addProjects: PropTypes.func.isRequired
}

export default connect(null, { addProjects })(withRouter(AddProjects));
