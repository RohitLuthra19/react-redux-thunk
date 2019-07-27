import { fromJS } from 'immutable';

export const initialState = fromJS({
  categories: {
    fetching: false,
    error: false,
    items: [],
    images: [],
    limit: 10,
    page: 0,
    activeCategory: -1,
  }
})