import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getBlogs } from '../../actions/blog';
import BItem from './BItem';
import BlogForm from './BlogForm';

const Blogs = ({ getBlogs, blog: { blogs, loading }}) => {
  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return loading ? ( <Loader />
    ) : (
      <Fragment>
        <h1 className='large text-primary'>Blogs</h1>
        <p className='lead'><i className='fas fa-users'></i> Welcome to the technical blog spot </p>
        <BlogForm />
        <div className='posts'>
          {blogs.map(blog => (
            <BItem key={blog._id} blog={blog} />
          ))}
        </div>
      </Fragment>
    );

}

Blogs.propTypes = {
  getBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  blog: state.blog
});

export default connect(mapStateToProps, { getBlogs })(Blogs);
