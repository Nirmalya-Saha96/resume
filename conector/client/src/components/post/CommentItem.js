import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { addCommentLike, removeCommentLike, deleteComment } from '../../actions/post';

const CommentItem = ({postId, auth, addCommentLike, removeCommentLike, deleteComment, comment: { _id, text, likes, name, avatar, user, date }}) => {
  return (
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              class="round-img"
              src={avatar}
              alt="avatar"
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1">
            {text}
          </p>
           <p class="post-date">
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
          <button onClick={e => addCommentLike(postId, _id)} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-up"></i>{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button onClick={e => removeCommentLike(postId, _id)} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-down"></i>
          </button>
          {!auth.loading && user === auth.user._id && (
            <button onClick={e => deleteComment(postId, _id)} type='button' className='btn btn-danger'>
              <i className="fas fa-trash-alt"></i>
            </button>
          )}
        </div>
      </div>
  );
}

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  addCommentLike: PropTypes.func.isRequired,
  removeCommentLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps,  { addCommentLike, removeCommentLike, deleteComment })(CommentItem);
