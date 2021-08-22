import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBlog } from '../../actions/blog';

const BlogForm = ({ addBlog }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    text: ''
  });

  const { title, author, text } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addBlog(formData);
    setFormData('');
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Share your technical knowledge in form of a creative blog</h3>
      </div>
      <form className="form my-1" onSubmit={e => onSubmit(e)}>
        <input type="text" placeholder="* Title" name="title" value={title} onChange={e => onChange(e)} required />
        <input type="text" placeholder="* Author" name="author" value={author} onChange={e => onChange(e)} required />
        <textarea
          name="text"
          cols="30"
          rows="10"
          placeholder="* Blog body"
          value={text}
          onChange={e => onChange(e)}
          required
        ></textarea>
        <br />
        <input type="submit" className="btn btn-dark" value="Submit" />
      </form>
    </div>
  );
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default connect(null, { addBlog })(BlogForm);
