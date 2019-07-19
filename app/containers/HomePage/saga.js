import {
  call, put, select, takeLatest
} from 'redux-saga/effects';

import request from 'utils/request';
import { makeSelectRouteQuery } from 'containers/HomePage/selectors';
import { LOAD_POSTS } from './constants';
import config from '../../config';
import { loadPostsError, loadPostsSuccess } from './actions';
import { makeSelectUserLoggedIn } from '../Auth/selectors';

export function* getPosts() {
  let requestURL = `${config.baseURL}/posts/`;
  const search = yield select(makeSelectRouteQuery());
  if (search) {
    requestURL = `${config.baseURL}/posts/${search}`;
  }
  try {
    let headerParams = {};
    const isLoggedIn = yield select(makeSelectUserLoggedIn());
    if (isLoggedIn) {
      const user = localStorage.getItem('user');
      const parseUser = JSON.parse(user);
      const { auth_token } = parseUser;
      headerParams = {
        Accept: 'application/json',
        Authorization: `Token ${auth_token}`,
        'Content-Type': 'application/json',
      };
    }
    const response = yield call(
      request,
      requestURL,
      { headers: headerParams }
    );
    yield put(loadPostsSuccess(response));
  } catch (err) {
    yield put(loadPostsError(err));
  }
}

export default function* postsData() {
  yield takeLatest(LOAD_POSTS, getPosts);
}
