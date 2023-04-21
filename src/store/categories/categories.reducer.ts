//import { createSlice } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { Category, CategoryState } from './categories.types';

import {
  fetchCategoriesStart, 
  fetchCategoriesSucceeded,  
  fetchCategoriesFailed} from './categories.action';

const INITIAL_STATE: CategoryState = {
  categoriesArray: [],
  isLoading: false,
  error: null
}

export const categoriesReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CategoryState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesSucceeded.match(action)) {
    return { ...state, categoriesArray: action.payload, isLoading: false };
  }

  if (fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};