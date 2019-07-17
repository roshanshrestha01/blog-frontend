import { END_SIGN_UP, SIGN_IN, SIGN_UP, SUCCESS_SIGN_IN, SUCCESS_SIGN_OUT } from './constants';

export function signIn(data) {
  return {
    type: SIGN_IN,
    data,
  };
}


export function successSignIn(payload) {
  return {
    type: SUCCESS_SIGN_IN,
    payload,
  };
}

export function successSignOut() {
  return {
    type: SUCCESS_SIGN_OUT,
  };
}

export function signUp(data) {
  return {
    type: SIGN_UP,
    data,
  };
}

export function endSignUp() {
  return {
    type: END_SIGN_UP,
  };
}
