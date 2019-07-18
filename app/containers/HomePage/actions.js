import {
  CHANGE_SEARCH_PARAM, CHANGE_USERNAME, LOAD_POSTS, LOAD_POSTS_ERROR, LOAD_POSTS_SUCCESS
} from './constants';

export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name
  };
}

export function loadPosts() {
  return {
    type: LOAD_POSTS,
  };
}

export function loadPostsSuccess(data) {
  return {
    type: LOAD_POSTS_SUCCESS,
    data,
  };
}

export function loadPostsError(error) {
  return {
    type: LOAD_POSTS_ERROR,
    error,
  };
}


export function changeSearchParam(query) {
  return {
    type: CHANGE_SEARCH_PARAM,
    query,
  };
}
