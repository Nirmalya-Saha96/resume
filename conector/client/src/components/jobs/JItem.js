import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteJob } from '../../actions/job';

const JItem = ({ auth, deleteJob, job: { _id, title, company, des, name, avatar, user, applicants, date }, showActions}) => {
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
        <p >
           <strong>company: </strong>{company}
        </p>
        <p className="my-1 p-display">
          <strong>Description: </strong>{des}
        </p>
        {showActions && <Fragment>
          <Link to={`/job/${_id}`} className="btn btn-primary">
            Applicants {applicants.length > 0 && (
              <span className='comment-count'>{applicants.length}</span>
            )}
          </Link>
          </Fragment>}
        {!auth.loading && user === auth.user._id && (
            <button
            onClick={e => deleteJob(_id)}
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

JItem.defaultProps = {
  showActions: true
}

JItem.propTypes = {
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteJob: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteJob })(JItem);
