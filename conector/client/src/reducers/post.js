import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT, UPDATE_CLIKES } from '../actions/types';

//initialising the state with post object an empty posts array loading an empty errors array
const initialState = {
  posts: [],
  post: null,
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
  //UPDATE_LIKES updates the posts array by finding the perticular post by id and changing the likes
  //UPDATE_CLIKES updates the post object by finding the perticular comment by id and changing the likes
  //ADD_COMMENT updates the post object with comments added
  //REMOVE_COMMENT updates the post object without the comment given by action
  //POST_ERROR stores the error in the error array
  switch(type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      }
    case ADD_POST:
      return {
        ...state,
        posts: [ payload, ...state.posts],
        loading: false
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      }
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes} : post),
        loading: false
      }
    case UPDATE_CLIKES:
     return {
       ...state,
       post: { ...state.post,
       comments: state.post.comments.map(comment => comment._id === payload.commentId ? { ...comment, likes: payload.likes} : comment )
      },
       loading: false
     }
    case ADD_COMMENT:
     return {
       ...state,
       post: { ...state.post, comments: payload },
       loading: false
     }
    case REMOVE_COMMENT:
     return {
       ...state,
       post: {
         ...state.post,
         comments: state.post.comments.filter(comment => comment._id !== payload)
       },
       loading: false
     }
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}
