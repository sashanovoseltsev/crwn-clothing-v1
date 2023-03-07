import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;
const selectCartItemsValuesArray = createSelector([selectCartReducer], (cart) => [...cart.items.values()]);


export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.items);

export const selectCartIsOpened = createSelector([selectCartReducer], (cart) => cart.isOpened);

export const selectTotalItems = createSelector([selectCartItemsValuesArray], (items) => getTotalItems(items));

export const selectTotalPrice = createSelector([selectCartItemsValuesArray], (items) => getTotalPrice(items));

function getTotalItems(items) {
  return items.reduce((total, item) => total + item.qnt, 0);
}

function getTotalPrice(items) {
  return items.reduce(
    (total, item) => total + item.price * item.qnt,
    0
  );
}