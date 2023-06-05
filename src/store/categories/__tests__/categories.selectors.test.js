import { selectCategories, 
  selectCategoriesArray, 
  selectCategoryIsLoading } from '../categories.selectors';

const mockedState = {
  categories: {
    isLoading: false,
    error: null,
    categoriesArray: [
      { id: 1, title: "C1", route: "mens", "imageUrl": "url1", items: [ { id: 1, name: "P1", price: 10, imageUrl: "url4" }]},
      { id: 2, title: "C2", route: "hats", "imageUrl": "url2", items: [ { id: 2, name: "P2", price: 20, imageUrl: "url3" }]},
    ]
  }
};

describe('Cagegories Selectors tests', () => {
  test('selectCategories should return categories data as map <title, Category>', () => {
    const catMap = selectCategories(mockedState);
    expect(catMap["c1"]).toEqual(mockedState.categories.categoriesArray[0]);
    expect(catMap["c2"]).toEqual(mockedState.categories.categoriesArray[1]);
  })

  test('selectCategoriesArray should return categories data', () => {
    expect(selectCategoriesArray(mockedState)).toEqual(mockedState.categories.categoriesArray);
  })

  test('selectCategoryIsLoading should return isLoading', () => {
    expect(selectCategoryIsLoading(mockedState)).toBe(mockedState.categories.isLoading);
  })
})