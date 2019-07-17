import {call, put, select, takeLatest} from 'redux-saga/effects';
import {LOAD_REPOS} from 'containers/App/constants';
import {repoLoadingError, reposLoaded} from 'containers/App/actions';

import request from 'utils/request';
import {makeSelectUsername} from 'containers/HomePage/selectors';
import {LOAD_POSTS} from './constants';
import config from '../../config';
import {loadPostsError, loadPostsSuccess} from "./actions";
import {makeSelectRouteQuery} from "./selectors";

export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* getPosts() {
  let requestURL = `${config.baseURL}/posts/`;
  const search = yield select(makeSelectRouteQuery());
  if (search) {
    requestURL = `${config.baseURL}/posts/${search}`;
  }
  try {
    const posts = yield call(request, requestURL);
    yield put(loadPostsSuccess(posts));
  } catch (err) {
    yield put(loadPostsError(err));
  }
}

export default function* postsData() {
  yield takeLatest(LOAD_POSTS, getPosts);
}
