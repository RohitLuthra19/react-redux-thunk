import reducer, { getAllCategories, getSingleCategory, selectCategory } from './reducer.js';
import { fromJS } from 'immutable';

const initialState = {
  fetching: false,
  error: false,
  categories: {
    items: [],
    images: [],
    limit: 10,
    page: 0,
    activeCategory: -1,
  }
}

describe('actions', () => {
  
  it('get categories', () => {
    const action = getAllCategories();
    const expected = reducer(fromJS(initialState), action);
    expect(expected.toJS().categories.fetching).toEqual(true);
  });

  it('select active category', () => {
    const action = selectCategory(5);
    const expected = reducer(fromJS(initialState), action);
    expect(expected.toJS().categories.activeCategory).toEqual(5);
  });

  it('get single category', () => {
    const action = getSingleCategory(5, 10, 1, true);
    const expected = reducer(fromJS(initialState), action);
    expect(expected.toJS().categories.fetching).toEqual(true);
  });
});