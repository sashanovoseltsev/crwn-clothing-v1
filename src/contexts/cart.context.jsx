import { createContext, useReducer } from 'react';

const INITIAL_VALUE = {
  isOpened: false,
  items: new Map(),
  cartTotalPrice: 0,
  cartTotalItems: 0
}

export const CartContext = createContext({});

const ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_OPENED: "SET_IS_OPENED"
}

const cartReducer = (state, action) => {
  const {type, payload} = action;

  switch(type) {
    case ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case ACTION_TYPES.SET_IS_OPENED:
      return {
        ...state,
        isOpened: payload
      }
    default:
      throw new Error(`Unknown type ${type} in CartReducer`);
  }
}

export const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_VALUE);

  const {items, cartTotalItems, cartTotalPrice, isOpened} = state;

  const updateCartItems = (newCartItems) => {
    const cartTotalPrice = getTotalPrice(newCartItems);
    const cartTotalItems = getTotalItems(newCartItems);

    dispatch({type: ACTION_TYPES.SET_CART_ITEMS, payload: {
      items: newCartItems,
      cartTotalPrice,
      cartTotalItems
    }});
  }

  const toggleCartOpened = () => {
    dispatch({type: ACTION_TYPES.SET_IS_OPENED, payload: !isOpened});
  }

  const addItemToCart = (item) => {
    const newItems = addItem(items, item);
    updateCartItems(newItems);
  }

  const changeItemQuantity = (item, qntToAdd) => {
    const newItems = changeQuantity(items, item, qntToAdd);
    updateCartItems(newItems);
  }

  const removeItemFromCart = (item) => {
    const newItems = removeItem(items, item);
    updateCartItems(newItems);
  }

  const value = {
    items,
    cartTotalItems,
    cartTotalPrice,
    addItemToCart,
    changeItemQuantity,
    removeItemFromCart,
    isOpened,
    toggleCartOpened
  };
  return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
}

function addItem(items, item) {
  const { id } = item;

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
    items.set(item.id, { ...item, qnt: newQnt });
  }

  return items;
}

function removeItem(items, item) {
  items.delete(item.id);

  return items;
}

function getTotalItems(items) {
  return [...items.values()].reduce((total, item) => total + item.qnt, 0);
}

function getTotalPrice(items) {
  return [...items.values()].reduce(
    (total, item) => total + item.price * item.qnt,
    0
  );
}
