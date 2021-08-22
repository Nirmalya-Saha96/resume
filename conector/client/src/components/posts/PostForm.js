import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    text: '',
    githuburl: ''
  });

  const { text, githuburl } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addPost(formData);
    setFormData('');
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Share the story behind your github commit</h3>
      </div>
      <form className="form my-1" onSubmit={e => onSubmit(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Description about the github commit"
          value={text}
          onChange={e => onChange(e)}
          required
        ></textarea>
        <br />
          <input type="text" placeholder="* Github Commit Url" name="githuburl" value={githuburl} onChange={e => onChange(e)} required />
        <input type="submit" className="btn btn-dark" value="Submit" />
      </form>
    </div>
  );
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm);
