import { takeLatest, all, call, put } from 'redux-saga/effects';

import { fetchCategoriesSucceeded, fetchCategoriesFailed } from './categories.action';

import { getDocumentsFromCollection } from '../../utils/firebase/firebase.utils';

import { CATEGORIES_ACTION_TYPES } from './categories.types';

const COLLECTION_CATEGORIES = "categories";

function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getDocumentsFromCollection, COLLECTION_CATEGORIES);
    yield put(fetchCategoriesSucceeded(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)])
}