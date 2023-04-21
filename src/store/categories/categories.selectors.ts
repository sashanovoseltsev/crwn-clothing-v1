import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

import { Category, CategoryMap, CategoryState } from './categories.types';

const selectCategoryReducer = (state: RootState): CategoryState => state.categories;

export const selectCategoriesArray = createSelector([selectCategoryReducer],
  (categories: CategoryState): Category[] => categories.categoriesArray);

export const selectCategories = createSelector([selectCategoriesArray], 
  (categoriesArray: Category[]): CategoryMap => categoriesArray.reduce((acc, category) => {
      acc[category.title.toLowerCase()] = category
      return acc;
    }, {} as CategoryMap));


  // NOTE: businesse logic related to transformation of data is moved to selector from firebase utils


export const selectCategoryIsLoading = createSelector([selectCategoryReducer], (categories) => categories.isLoading);