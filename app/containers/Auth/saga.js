import {call, put, takeLatest,} from 'redux-saga/effects';
import request from 'utils/request';
import {push} from 'connected-react-router';

import {REQUEST_FAILED, SIGN_IN, SIGN_UP, SUCCESS_SIGN_OUT} from './constants';
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
  } catch (err) {
    let error;
    try {
      error = yield err.response.json();
    } catch (e) {
      error = {errors: [{detail: `${err.name}: ${err.message}`}]};
    }
    yield put({type: REQUEST_FAILED, error})
  }
}

export function* userSignUp(action) {
  const requestURL = `${config.baseURL}/users/`;
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
    NotificationManager.success('Successfull created. Please login.');
    yield put(endSignUp());
    yield put(push('/auth/sign-in'));
  } catch (err) {
    let error;
    try {
      error = yield err.response.json();
    } catch (e) {
      error = {errors: [{detail: `${err.name}: ${err.message}`}]};
    }
    yield put({type: REQUEST_FAILED, error})
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
