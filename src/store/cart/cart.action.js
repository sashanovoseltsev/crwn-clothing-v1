import { CART_ACTION_TYPES } from './cart.type'

export const setCartItems = (cartItems) => {
  return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: cartItems };
};

export const setCartIsOpened = (isOpened) => {
  return { type: CART_ACTION_TYPES.SET_IS_OPENED, payload: isOpened };
}

export const toggleCartOpened = (isOpened) => {
  return setCartIsOpened(!isOpened);
}

export const addItemToCart = (items, item) => {
  const newItems = addItem(items, item);
  return setCartItems(newItems);
}

export const changeItemQuantity = (items, item, qntToAdd) => {
  const newItems = changeQuantity(items, item, qntToAdd);
  return setCartItems(newItems);
}

export const removeItemFromCart = (items, item) => {
  const newItems = removeItem(items, item);
  return setCartItems(newItems);
}


function addItem(items, item) {
  const id = item.id.toString();
  // convert id to string. 
  // Required for correct persist/rehydrate process during redux-persist store to local storage procedure

  const foundItem = items.get(id);
  if (!foundItem) {
    items.set(id, { ...item, qnt: 1 });
  } else {
    items.set(id, { ...foundItem, qnt: ++foundItem.qnt });
  }

  return items;
}

function changeQuantity(items, item, qnt) {
  const newQnt = item.qnt + qnt;
  if (newQnt > 0) {
    items.set(item.id.toString(), { ...item, qnt: newQnt });
  }

  return items;
}

function removeItem(items, item) {
  items.delete(item.id.toString());

  return items;
}