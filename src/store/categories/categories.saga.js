import { takeLatest, all, call, put } from 'redux-saga/effects';

import { fetchCategoriesSucceeded, fetchCategoriesFailed, fetchCategoriesStart } from './categories.reducer';

import { getDocumentsFromCollection } from '../../utils/firebase/firebase.utils';

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
  yield takeLatest(fetchCategoriesStart.type, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)])
}