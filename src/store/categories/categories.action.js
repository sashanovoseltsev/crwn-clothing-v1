import { CATEGORIES_ACTION_TYPES } from './categories.types';

export const setCategories = (categoriesMap) => {
  return { type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES, payload: categoriesMap };
}