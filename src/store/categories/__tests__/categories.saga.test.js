import { call } from 'typed-redux-saga/macro';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import { fetchCategoriesAsync, onFetchCategories, categoriesSaga } from '../categories.saga';
import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSucceeded } from '../categories.action';
import { getDocumentsFromCollection } from '../../../utils/firebase/firebase.utils';

describe('Categories Sagas', () => {
  test('categoriesSaga', () => {
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories)])
      .next()
      .isDone();
  })

  test('onFetchCategories saga', () => {
    testSaga(onFetchCategories)
      .next()
      .takeLatest(fetchCategoriesStart.type, fetchCategoriesAsync)
      .next()
      .isDone();
  });

  test('fecthCategoriesAsync success', () => {

    const mockedCategories = [
      { id: 1, title: "mens" },
      { id: 2, title: "hats" },
    ]

    return expectSaga(fetchCategoriesAsync)
      .provide([
        [call(getDocumentsFromCollection, "categories"), mockedCategories]
      ])
      .put(fetchCategoriesSucceeded(mockedCategories))
      .run();
  });

  test('fetchCategoriesAsync failure', () => {
    const mockedError = new Error('test failure');

    return expectSaga(fetchCategoriesAsync)
      .provide([
        [call(getDocumentsFromCollection, "categories"), throwError(mockedError)]
      ])
      .put(fetchCategoriesFailed(mockedError))
      .run();
  })
})