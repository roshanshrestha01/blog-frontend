import {
  call, put, select, takeLatest
} from 'redux-saga/effects';

import request from 'utils/request';
import { makeSelectRouteQuery } from 'containers/HomePage/selectors';
import { LOAD_POSTS } from './constants';
import config from '../../config';
import { loadPostsError, loadPostsSuccess } from './actions';

export function* getPosts() {
  let requestURL = `${config.baseURL}/posts/`;
  const search = yield select(makeSelectRouteQuery());
  if (search) {
    requestURL = `${config.baseURL}/posts/${search}`;
  }
  try {
    const response = yield call(request, requestURL);
    yield put(loadPostsSuccess(response));
  } catch (err) {
    yield put(loadPostsError(err));
  }
}

export default function* postsData() {
  yield takeLatest(LOAD_POSTS, getPosts);
}
