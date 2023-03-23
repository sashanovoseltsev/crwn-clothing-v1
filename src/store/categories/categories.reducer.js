import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  categoriesArray: [],
  isLoading: false,
  error: null
}

export const categoriesSlice = createSlice({
  name: 'category',
  initialState: INITIAL_STATE,
  reducers: {
    fetchCategoriesStart(state, _) {
      state.isLoading = true;
    },

    fetchCategoriesFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    fetchCategoriesSucceeded(state, action) {
      state.isLoading = false;
      state.categoriesArray = action.payload;
    }
  }
});

export const { fetchCategoriesStart, fetchCategoriesFailed, fetchCategoriesSucceeded } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;