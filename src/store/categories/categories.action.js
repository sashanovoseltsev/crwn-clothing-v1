import { CATEGORIES_ACTION_TYPES } from './categories.types';

export const fetchCategoriesSucceeded = (categories) => {
  return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload: categories };
}

export const fetchCategoriesStart = () => {
  return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START }
}

export const fetchCategoriesFailed = () => {
  return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED }
}

