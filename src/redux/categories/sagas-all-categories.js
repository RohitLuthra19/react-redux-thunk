import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import * as types from './types';
import * as constants from '../constants';

export function* categoriesWatcherSaga() {
    yield takeLatest(types.GET_ALL_CATEGORIES_REQUEST, workerSaga);
}

export function fetchData(baseUrl) {
    const url =`${baseUrl}/categories`;

    return axios.get(url, {})
        .then(val => val)
        .catch(err => console.log('get categories error', err))
}

export function* workerSaga() {
    try {
        const data = yield call(fetchData, constants.BASE_URL);

        if (data) {
            yield put({ type: types.GET_ALL_CATEGORIES_SUCCESS, data });
        } else {
            yield put({ type: types.GET_ALL_CATEGORIES_FAILURE, error: true });
        }

    } catch (error) {
        yield put({ type: types.GET_ALL_CATEGORIES_FAILURE, error });
    }
}