import { fromJS } from 'immutable';

import { END_SIGN_UP, SIGN_IN, SIGN_UP, SUCCESS_SIGN_IN, SUCCESS_SIGN_OUT } from './constants';
// The initial state of the App
const initialState = fromJS({
  authLoading: false,
  user: {
    email: null,
    token: null,
    isLoggedIn: false,
  },
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return state.set('authLoading', true);
    case SUCCESS_SIGN_IN:
      let data = action.payload;
      data.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
      return state
        .set('authLoading', false)
        .set('user', action.payload);
    case SUCCESS_SIGN_OUT:
      localStorage.removeItem('user');
      return state
        .set('user', {
          email: null,
          token: null,
          isLoggedIn: false,
        });
    case SIGN_UP:
      return state.set('authLoading', true);
    case END_SIGN_UP:
      return state.set('authLoading', false);
    default:
      return state;
  }
}

export default authReducer;
