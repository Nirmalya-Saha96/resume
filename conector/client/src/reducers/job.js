import { GET_JOBS, JOB_ERROR, DELETE_JOB, ADD_JOB, GET_JOB, ADD_APPLICANT, REMOVE_APPLICANT } from '../actions/types';

//initialising the state with post object an empty posts array loading an empty errors array
const initialState = {
  jobs: [],
  job: null,
  loading: true,
  error: {}
}

//receiving the initialState and the action
export default function(state = initialState, action) {
  //destructing the type and payload from actions
  const { type, payload } = action;

  //GET_POSTS with the state of posts array
  //GET_POST stores the post in the post object
  //ADD_POST updates the posts array with the added post
  //DELETE_POST updates the posts array without the post id which is deleted
  //ADD_COMMENT updates the post object with comments added
  //REMOVE_COMMENT updates the post object without the comment given by action
  //POST_ERROR stores the error in the error array
  switch(type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: payload,
        loading: false
      }
      case GET_JOB:
        return {
          ...state,
          job: payload,
          loading: false
        }
      case ADD_APPLICANT:
       return {
         ...state,
         job: { ...state.job, applicants: payload },
         loading: false
       }
       case REMOVE_APPLICANT:
        return {
          ...state,
          job: {
            ...state.job,
            applicants: state.job.applicants.filter(applicant => applicant._id !== payload)
          },
          loading: false
        }
    case ADD_JOB:
      return {
        ...state,
        jobs: [ payload, ...state.jobs],
        loading: false
      }
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job._id !== payload),
        loading: false
      }
    case JOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}
