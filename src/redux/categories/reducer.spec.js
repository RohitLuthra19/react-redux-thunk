import reducer from './reducer.js';
import { getAllCategoriesRequest, getSingleCategoryRequest, selectCategory} from './actions';
import * as types from './types';
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
  
  /* it('get categories', () => {
    const action = getAllCategoriesRequest();
    const expected = reducer(fromJS(initialState), action);
    expect(expected.toJS().categories.fetching).toEqual(true);
  });

  it('select active category', () => {
    const action = selectCategory(5);
    const expected = reducer(fromJS(initialState), action);
    expect(expected.toJS().categories.activeCategory).toEqual(5);
  });

  it('get single category', () => {
    const action = getSingleCategoryRequest(5, 10, 1, true);
    const expected = reducer(fromJS(initialState), action);
    expect(expected.toJS().categories.fetching).toEqual(true);
  }); */

  it('get categories: should handle GET_ALL_CATEGORIES_REQUEST', () => {
    const action = { type: types.GET_ALL_CATEGORIES_REQUEST };
    const expected = reducer(fromJS(initialState), action);
    expect(expected.toJS().categories.fetching).toEqual(true);
  });

  it('get categories: should handle GET_ALL_CATEGORIES_SUCCESS', () => {
    const data = {
      "data": [{
          "id": 5,
          "name": "boxes"
        },{
          "id": 15,
          "name": "clothes"
        },{
          "id": 1,
          "name": "hats"
        },{
          "id": 14,
          "name": "sinks"
        },{
          "id": 2,
          "name": "space"
        },{
          "id": 4,
          "name": "sunglasses"
        },{
          "id": 7,
          "name": "ties"
        }
      ]
    }
    const action = { type: types.GET_ALL_CATEGORIES_SUCCESS, data };
    const expected = reducer(fromJS(initialState), action);
    expect(expected.toJS().categories.items.length).toEqual(7);
    expect(expected.toJS().categories.activeCategory).toEqual(5);
  });

  it('get single category: should handle GET_SINGLE_CATEGORY_REQUEST', () => {
    const action = { type: types.GET_SINGLE_CATEGORY_REQUEST };
    const expected = reducer(fromJS(initialState), action);
    expect(expected.toJS().categories.fetching).toEqual(true);
  });

  it('get single category: should handle GET_SINGLE_CATEGORY_SUCCESS', () => {
    const data= {
      "data": [{
          "breeds": [],
          "categories": [{
            "id": 5,
            "name": "boxes"
          }],
          "id": "c0",
          "url": "https://cdn2.thecatapi.com/images/c0.jpg",
          "width": 1936,
          "height": 1936
        },
        {
          "breeds": [],
          "categories": [{
            "id": 5,
            "name": "boxes"
          }],
          "id": "f1",
          "url": "https://cdn2.thecatapi.com/images/f1.jpg",
          "width": 1280,
          "height": 855
        }],
    }
    const action = { type: types.GET_SINGLE_CATEGORY_SUCCESS, data, isMore: false };
    const expected = reducer(fromJS(initialState), action);
    expect(expected.toJS().categories.images.length).toEqual(2);
  });

  it('select active category: should handle SELECT_CATEGORY', () => {
    const action = { type: types.SELECT_CATEGORY, categoryId: 5 };
    const expected = reducer(fromJS(initialState), action);
    expect(expected.toJS().categories.activeCategory).toEqual(5);
  });
});