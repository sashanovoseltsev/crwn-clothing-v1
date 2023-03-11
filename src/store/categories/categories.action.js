import { CATEGORIES_ACTION_TYPES } from './categories.types';

import { getDocumentsFromCollection } from '../../utils/firebase/firebase.utils';

const COLLECTION_CATEGORIES = "categories";

const fetchCategoriesSucceeded = (categories) => {
  return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload: categories };
}

const fetchCategoriesStart = () => {
  return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START }
}

const fetchCategoriesFailed = () => {
  return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED }
}

export const fetchCategories = async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    setTimeout(async () => {
      // const categoriesArray = await getDocumentsFromCollection(
      //   COLLECTION_CATEGORIES
      // );
      // dispatch(fetchCategoriesSucceeded(categoriesArray));
    }, 10000);
    const categoriesArray = await getDocumentsFromCollection(
      COLLECTION_CATEGORIES
    );
    dispatch(fetchCategoriesSucceeded(categoriesArray));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error)); 
  }
}

