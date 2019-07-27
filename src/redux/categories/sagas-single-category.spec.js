import { workerSaga, fetchData } from './sagas-single-category';
import { put, takeLatest, call } from 'redux-saga/effects';
import * as constants from '../constants';

describe('Get single category saga tests', () => {
  it('should get single category from API and call success action', () => {
    const action = { categoryId: 1, limit: 10, page: 0, isMore: true };
    const iterator = workerSaga(action);
    expect(iterator.next(true).value).toEqual(call(fetchData, constants.BASE_URL, action.categoryId, action.limit, action.page));
    iterator.next();
    expect(iterator.next().done).toBeTruthy();
  });
});
