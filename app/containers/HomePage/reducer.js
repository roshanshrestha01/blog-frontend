  import {CHANGE_USERNAME, LOAD_POSTS_SUCCESS} from './constants';

// The initial state of the App
const initialState = {
  username: '',
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return { ...state, username: action.name.replace(/@/gi, '') };
    case LOAD_POSTS_SUCCESS:
      return { ...state, posts: action.data };
    default:
      return state;
  }
}

export default homeReducer;
