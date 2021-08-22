import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getPost } from '../../actions/post';
import Item from '../posts/Item';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? <Loader /> : <Fragment>
    <Item post={post} showActions={false} />
    <CommentForm postId={post._id} />
    <div className='comments'>
      {post.comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}
    </div>
  </Fragment>
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
