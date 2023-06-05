import {
  CATEGORY_INITIAL_STATE,
  categoriesReducer
} from '../categories.reducer';

import {
  fetchCategoriesStart, 
  fetchCategoriesSucceeded,  
  fetchCategoriesFailed} from '../categories.action';


describe('Categories reducer tests', () => {
  test('fetchCategoriesStart', () => {
    const expectedState = {
      ...CATEGORY_INITIAL_STATE,
      isLoading: true
    };

    expect(categoriesReducer(CATEGORY_INITIAL_STATE, fetchCategoriesStart())).toEqual(expectedState);
  })

  test('fetchCategoriesSucceeded', () => {
    const mockedCategories = [
      { id: 1, title: "C1", route: "mens", "imageUrl": "url1", items: [ { id: 1, name: "P1", price: 10, imageUrl: "url4" }]},
      { id: 2, title: "C2", route: "hats", "imageUrl": "url2", items: [ { id: 2, name: "P2", price: 20, imageUrl: "url3" }]},
    ];
    const expectedState = {
      ...CATEGORY_INITIAL_STATE,
      isLoading: false,
      categoriesArray: mockedCategories
    };

    expect(categoriesReducer(CATEGORY_INITIAL_STATE, fetchCategoriesSucceeded(mockedCategories))).toEqual(expectedState);
  })

  test('fetchCategoriesFailed', () => {
    const mockedError = new Error("test failure");

    const expectedState = {
      ...CATEGORY_INITIAL_STATE,
      isLoading: false,
      error: mockedError
    };

    expect(categoriesReducer(CATEGORY_INITIAL_STATE, fetchCategoriesFailed(mockedError))).toEqual(expectedState);
  })
})