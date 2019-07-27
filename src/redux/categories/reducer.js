import * as types from './types';
//import { fromJS } from 'immutable';
import { initialState } from './initialState';

const reducer = (state = initialState, action) => {
    switch(action.type) {

        //Get all categories
        case types.GET_ALL_CATEGORIES_REQUEST:
            return state.setIn(['categories', 'fetching'], true)
              .setIn(['categories', 'error'], false);

        case types.GET_ALL_CATEGORIES_SUCCESS:
            const { data } = action.data;
            const defaultCategory = data && data[0].id;

            return state.setIn(['categories', 'fetching'], false)
              .setIn(['categories', 'error'], false)
              .setIn(['categories', 'items'], data)
              .setIn(['categories', 'activeCategory'], defaultCategory);

        case types.GET_ALL_CATEGORIES_FAILURE:
            return state.setIn(['categories', 'fetching'], false)
              .setIn(['categories', 'error'], true);

        //Get Specific category
        case types.GET_SINGLE_CATEGORY_REQUEST:
            return state.setIn(['categories', 'fetching'], true)
              .setIn(['categories', 'error'], false);

        case types.GET_SINGLE_CATEGORY_SUCCESS:
            const { data: imagesData } = action.data;
            
            return state.setIn(['categories', 'fetching'], false)
              .setIn(['categories', 'error'], false)
              /* .setIn(['categories', 'images'], imagesData); */
              .updateIn(['categories', 'images'], images => {
                if (action.isMore) {
                  return [...images, ...imagesData];
                }
                return [...imagesData]; 
              });

        case types.GET_SINGLE_CATEGORY_FAILURE:
            return state.setIn(['categories', 'fetching'], false)
              .setIn(['categories', 'error'], true);

        case types.SELECT_CATEGORY:
            return state.setIn(['categories', 'activeCategory'], action.categoryId)
            .setIn(['categories', 'images'], []);

        default: 
            return state;
    }
}

export default reducer;

export const getAllCategories = () => ({ type: types.GET_ALL_CATEGORIES_REQUEST })
export const getSingleCategory = (categoryId, limit, page, isMore) => ({ type: types.GET_SINGLE_CATEGORY_REQUEST, categoryId, limit, page, isMore })
export const selectCategory = (categoryId) => ({ type: types.SELECT_CATEGORY, categoryId})
