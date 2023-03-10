import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.items);

export const selectCartIsOpened = createSelector([selectCartReducer], (cart) => cart.isOpened);

export const selectTotalItems = createSelector([selectCartItems], (items) => getTotalItems(items));

export const selectTotalPrice = createSelector([selectCartItems], (items) => getTotalPrice(items));

function getTotalItems(items) {
  var total = 0;
  items.forEach((value, _) => {
    total += value.qnt;
  });
  return total;
  //return [...items.values()].reduce((total, item) => total + item.qnt, 0);
}

function getTotalPrice(items) {
  var total = 0;
  items.forEach((item, _) => {
    total += item.qnt * item.price;
  });
  return total;
  // return [...items.values()].reduce(
  //   (total, item) => total + item.price * item.qnt,
  //   0
  // );
}