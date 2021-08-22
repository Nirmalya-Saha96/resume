import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import { getJobs } from '../../actions/job';
import JItem from './JItem';
import JobForm from './JobForm';
import SearchBox from '../layout/SearchBox';

const Jobs = ({ getJobs, job: { jobs, loading }}) => {
  useEffect(() => {
    getJobs();
  }, [getJobs]);

  const [s, setS] = useState('');

  const onSearchChangee = e => {
    setS(e.target.value);
  }

  return loading ? ( <Loader />
    ) : (
      <Fragment>
        <h1 className='large text-primary'>Jobs</h1>
        <p className='lead'><i className='fas fa-users'></i> Get yourself hired </p>
        <JobForm />

        <div className='posts'>
          <SearchBox searchChange={ onSearchChangee}/>
          {jobs.length > 0 ? (
            jobs = jobs.filter(job => (
               job.title.toLowerCase().includes(s.toLowerCase())
            )),

            jobs.map(job => (
            <JItem key={job._id} job={job} />
          ))
         ) : ( <h4> No jobs found</h4> ) 
        }
        </div>
      </Fragment>
    );

}

Jobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  job: state.job
});

export default connect(mapStateToProps, { getJobs })(Jobs);
