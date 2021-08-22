import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getJob } from '../../actions/job';
import JItem from '../jobs/JItem';
import ApplicantForm from './ApplicantForm';
import ApplicantItem from './ApplicantItem';

const Job = ({ getJob, job: { job, loading }, match }) => {
  useEffect(() => {
    getJob(match.params.id);
  }, [getJob, match.params.id]);

  return loading || job === null ? <Loader /> : <Fragment>
    <JItem job={job} showActions={false} />
    <ApplicantForm jobId={job._id} />
    <div className='comments'>
      {job.applicants && (
        job.applicants.map(applicant => (
          <ApplicantItem key={applicant._id} applicant={applicant} jobId={job._id} job={job} />
      )))}

    </div>
  </Fragment>
}

Job.propTypes = {
  getJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  job: state.job
});

export default connect(mapStateToProps, { getJob })(Job);


// {job.applicants.map(applicant => (
//   <ApplicantItem key={applicant._id} applicant={applicant} jobId={job._id} job={job} />
// ))}
