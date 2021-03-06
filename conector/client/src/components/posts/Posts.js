import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getPosts } from '../../actions/post';
import Item from './Item';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading }}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? ( <Loader />
    ) : (
      <Fragment>
        <h1 className='large text-primary'>Feed</h1>
        <p className='lead'><i className='fas fa-users'></i> Welcome to the hub </p>
        <PostForm />
        <div className='posts'>
          {posts.map(post => (
            <Item key={post._id} post={post} />
          ))}
        </div>
      </Fragment>
    );

}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
