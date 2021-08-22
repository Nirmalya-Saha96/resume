import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLinks } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddLinks = ({ addLinks, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    link: ''
  });

  const { title, link } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addLinks(formData, history);
  }



  return (
    <Fragment>
      <h1 class="large text-primary">
       Add Your QuickLinks/Portfolio
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add your quick links you want to make visible for others
      </p>

      <hr />
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="* Title" name="title" value={title} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group nirmalya-hover">
          <input type="text" placeholder="* Links" name="link" value={link} onChange={e => onChange(e)} />
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">Back</Link>
      </form>
      <small>* = required field</small>
    </Fragment>
  );
}

AddLinks.propTypes = {
  addLinks: PropTypes.func.isRequired
}

export default connect(null, { addLinks })(withRouter(AddLinks));
