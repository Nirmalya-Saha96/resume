import axios from 'axios';
import { setAlert } from './alert';
import { GET_JOBS, JOB_ERROR, DELETE_JOB, ADD_JOB, GET_JOB, ADD_APPLICANT, REMOVE_APPLICANT } from './types';

//get jobs by a get methode
export const getJobs = () => async dispatch => {
  try {
    const res = await axios.get('/api/job');

    dispatch({
      type: GET_JOBS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//delete job by giving the post id by a delete request
//and returning the id as the payload
export const deleteJob = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/job/${id}`);

    dispatch({
      type: DELETE_JOB,
      payload: id
    });

    dispatch(setAlert('Job deleted', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//add job by giving the formdata and token by a post methode
//and returning the post as payload
export const addJob = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/job', formData, config);

    dispatch({
      type: ADD_JOB,
      payload: res.data
    });

    dispatch(setAlert('Job created', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//get Job by giving the post id by a get request
//and returning the post as the payload
export const getJob = id => async dispatch => {
  try {
    const res = await axios.get(`/api/job/${id}`);

    dispatch({
      type: GET_JOB,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//add applicant by giving the post id and the formdata with token by  a post request
//and returning the updated post as payload
export const addApplicant = (jobId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`/api/job/applicant/${jobId}`, formData, config);

    dispatch({
      type: ADD_APPLICANT,
      payload: res.data
    });

    dispatch(setAlert('Applicant Added Successfully', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//delete applicant by giving the post id and the commentid with token by  a delete request
//and returning the comment id as payload
export const deleteApplicant = (jobId, applicantId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/job/applicant/${jobId}/${applicantId}`);

    dispatch({
      type: REMOVE_APPLICANT,
      payload: applicantId
    });

    dispatch(setAlert('Applicant Removed Successfully', 'success'));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
