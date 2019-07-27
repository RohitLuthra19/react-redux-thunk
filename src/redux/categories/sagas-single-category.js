import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import * as types from './types';
import * as constants from '../constants';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* singleCategoryWatcherSaga() {
  yield takeLatest(types.GET_SINGLE_CATEGORY_REQUEST, workerSaga);
}

export function fetchData(baseUrl, categoryId, limit, page) {
  const url = `${baseUrl}/images/search?category_ids=${categoryId}&limit=${limit}&page=${page}`;

  return axios.get(url)
    .then(val => val)
    .catch(err => console.log('get single category error: ', err))
}

// worker saga: makes the api call when watcher saga sees the action
export function* workerSaga({ categoryId, limit, page, isMore }) {
  try {
    const data = yield call(fetchData, constants.BASE_URL, categoryId, limit, page);

    if (data) {
      yield put({ type: types.GET_SINGLE_CATEGORY_SUCCESS, data, isMore });
    } else {
      yield put({ type: types.GET_SINGLE_CATEGORY_FAILURE, error: true });
    }

  } catch (error) {
    yield put({ type: types.GET_SINGLE_CATEGORY_FAILURE, error: true });
  }
}
