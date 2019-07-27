import { workerSaga, fetchData } from './sagas-all-categories';
import { put, takeLatest, call } from 'redux-saga/effects';
import * as constants from '../constants';

describe('Get categories saga tests', () => {
  it('should get categories from API and call success action', () => {
    const iterator = workerSaga();
    expect(iterator.next(true).value).toEqual(call(fetchData, constants.BASE_URL));
    iterator.next();
    expect(iterator.next().done).toBeTruthy();
  });

});
