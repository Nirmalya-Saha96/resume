import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addBLike, removeBLike, deleteBlog } from '../../actions/blog';

const BItem = ({ auth, addBLike, removeBLike, deleteBlog, blog: { _id, title, text, author, name, avatar, user, likes, date }}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src={avatar}
            alt="avatar"
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="lead">
          <strong>{title}</strong>
        </p>
        <p className="post-date">
           <strong>Author: </strong>{author}
        </p>
        <p className="my-1 p-display">
          {text}
        </p>
        <button onClick={e => addBLike(_id)} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>{' '}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button onClick={e => removeBLike(_id)} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        {!auth.loading && user === auth.user._id && (
            <button
            onClick={e => deleteBlog(_id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        )}
      </div>
    </div>
  );
}

BItem.propTypes = {
  blog: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addBLike: PropTypes.func.isRequired,
  removeBLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { addBLike, removeBLike, deleteBlog })(BItem);
