import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteApplicant } from '../../actions/job';

const ApplicantItem = ({jobId, auth, deleteApplicant, job, applicant: { _id, text, urls, name, avatar, user, date }}) => {
  return (
    <div>
    {!auth.loading && ( user === auth.user._id || job.user === auth.user._id ) && (
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
          <p class="my-1 p-display">
            {text}
          </p>
          <p class="my-1 p-display">
            <strong>Urls: </strong>{urls}
          </p>
           <p class="post-date">
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>

            <button onClick={e => deleteApplicant(jobId, _id)} type='button' className='btn btn-danger'>
              <i className="fas fa-trash-alt"></i>
            </button>

        </div>
      </div>
      )}
      </div>
  );
}

ApplicantItem.propTypes = {
  jobId: PropTypes.number.isRequired,
  applicant: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
  deleteApplicant: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps,  { deleteApplicant })(ApplicantItem);
