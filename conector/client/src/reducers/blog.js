import { GET_BLOGS, BLOG_ERROR, UPDATE_BLIKES, DELETE_BLOG, ADD_BLOG } from '../actions/types';

//initialising the state with blog object an empty blogs array loading an empty errors array
const initialState = {
  blogs: [],
  blog: null,
  loading: true,
  error: {}
}

//receiving the initialState and the action
export default function(state = initialState, action) {
  //destructing the type and payload from actions
  const { type, payload } = action;

  //GET_POSTS with the state of posts array
  //ADD_POST updates the posts array with the added post
  //DELETE_POST updates the posts array without the post id which is deleted
  //UPDATE_LIKES updates the posts array by finding the perticular post by id and changing the likes
  //POST_ERROR stores the error in the error array
  switch(type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: payload,
        loading: false
      }
    case ADD_BLOG:
      return {
        ...state,
        blogs: [ payload, ...state.blogs],
        loading: false
      }
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog._id !== payload),
        loading: false
      }
    case UPDATE_BLIKES:
      return {
        ...state,
        blogs: state.blogs.map(blog => blog._id === payload.id ? { ...blog, likes: payload.likes} : blog),
        loading: false
      }
    case BLOG_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}
