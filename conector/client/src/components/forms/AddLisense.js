import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLisense } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddLisense = ({ addLisense, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    credential: ''
  });

  const { title, organization, credential } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addLisense(formData, history);
  }



  return (
    <Fragment>
      <h1 class="large text-primary">
       Add Your Certificates/Lisense
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add your certificate and lisense with proper credential id
         to visible for the others
      </p>

      <hr />
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="* Title" name="title" value={title} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="* Organization Name" name="organization" value={organization} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="* Credential" name="credential" value={credential} onChange={e => onChange(e)} />
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">Back</Link>
      </form>
      <small>* = required field</small>
    </Fragment>
  );
}

AddLisense.propTypes = {
  addLisense: PropTypes.func.isRequired
}

export default connect(null, { addLisense })(withRouter(AddLisense));
