import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategoriesArray = createSelector([selectCategoryReducer],
  (categories) => categories.categoriesArray);

export const selectCategories = createSelector([selectCategoriesArray], 
  (categoriesArray) => categoriesArray.reduce((acc, category) => {
      const { title, items, imageUrl, route, id } = category;
      acc[title.toLowerCase()] = {title, items, imageUrl, route, id};
      return acc;
    }, {}));


  // NOTE: businesse logic related to transformation of data is moved to selector from firebase utils


export const selectCategoryIsLoading = createSelector([selectCategoryReducer], (categories) => categories.isLoading);