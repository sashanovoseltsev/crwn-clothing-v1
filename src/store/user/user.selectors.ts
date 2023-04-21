import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectUserReducer = (state: RootState) => state.user;

export const selectCurrentUser = createSelector([selectUserReducer], (user) => user.currentUser);
export const selectUserIsLoading = createSelector([selectUserReducer], (user) => user.isLoading);