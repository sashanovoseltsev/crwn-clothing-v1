import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import { fetchCategoriesSucceeded, fetchCategoriesFailed, fetchCategoriesStart } from './categories.action';

import { getDocumentsFromCollection } from '../../utils/firebase/firebase.utils';

const COLLECTION_CATEGORIES = "categories";

function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getDocumentsFromCollection, COLLECTION_CATEGORIES);
    yield* put(fetchCategoriesSucceeded(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

function* onFetchCategories() {
  yield* takeLatest(fetchCategoriesStart.type, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)])
}