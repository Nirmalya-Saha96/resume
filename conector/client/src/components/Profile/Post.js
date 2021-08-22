import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Post = ({
  posts: {
    _id,
    text,
    githuburl
  }
}) => {


  return (
    <div>
      <h3 className='text-dark'>{text}</h3>
      <a href={githuburl} target="_blank" rel='noopener noreferrer'>
        <strong className='btn btn-primary'>Github Url</strong>
      </a>
      <Link to={`/post/${_id}`} className='btn btn-primary'>View Post</Link>
    </div>
  );
}

Post.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Post;
