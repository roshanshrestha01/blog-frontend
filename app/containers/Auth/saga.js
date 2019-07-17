import {call, put, takeLatest,} from 'redux-saga/effects';
import request from 'utils/request';
import {push} from 'connected-react-router';

import {SIGN_IN, SIGN_UP, SUCCESS_SIGN_OUT} from './constants';
import {endSignUp, successSignIn} from './actions';
import config from '../../config';
import {NotificationManager} from 'react-notifications';


export function* userSignIn(action) {
  const requestURL = `${config.baseURL}/sessions/`;
  const {data} = action;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    yield put(successSignIn(response));
    yield put(push('/'));
    return response;
  } catch (err) {
    NotificationManager.error('Invalid Credentials. Please try again');
  }
}

export function* userSignUp(action) {
  const requestURL = `${config.baseURL}/users/`;
  const {data} = action;
  try {
    const auth = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    NotificationManager.success('Please verify email address.');
    yield put(endSignUp());
    yield put(push('/auth/sign-in'));
  } catch (err) {
    const {error} = err;
    if (error.hasOwnProperty('errors')) {
      NotificationManager.error(error.non_field_errors);
    }
    if (error.hasOwnProperty('password1')) {
      NotificationManager.error(error.password1);
    }
    if (error.hasOwnProperty('email')) {
      NotificationManager.error(error.email);
    }
    yield put(endSignUp());
  }
}

export function* userSignOut() {
  yield put(push('/auth/sign-in'));
}

export default function* githubData() {
  yield takeLatest(SIGN_IN, userSignIn);
  yield takeLatest(SUCCESS_SIGN_OUT, userSignOut);
  yield takeLatest(SIGN_UP, userSignUp);
}
