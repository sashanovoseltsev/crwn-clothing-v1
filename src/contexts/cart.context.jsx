import { createContext, useReducer } from "react";

export const CartContext = createContext({});

const CART_ACTION_TYPES = {
  SET_CART_STATE: 'SET_CART_STATE'
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_STATE:
      return {
        ...state,
        cartState: payload
      }
    default:
      throw new Error (`Unknown action type ${type} in cartReducer`);
  }

}

export const CartProvider = ({ children }) => {
  const [{cartState}, dispatch] = useReducer(cartReducer, {cartState: {
    items: new Map(),
    isOpened: false,
    addItem,
    getTotalItems,
    getTotalPrice,
    changeQuantity,
    removeItem,
  }});

  const setCartState = (cart) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_STATE, payload: cart});
  }

  const value = { cartState, setCartState };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function addItem(item) {
  const { id } = item;

  const foundItem = this.items.get(id);
  if (!foundItem) {
    this.items.set(id, { ...item, qnt: 1 });
  } else {
    this.items.set(id, { ...foundItem, qnt: ++foundItem.qnt });
  }
}

function getTotalItems() {
  return [...this.items.values()].reduce((total, item) => total + item.qnt, 0);
}

function getTotalPrice() {
  return [...this.items.values()].reduce(
    (total, item) => total + item.price * item.qnt,
    0
  );
}

function changeQuantity(item, qnt) {
  const newQnt = item.qnt + qnt;
  if (newQnt > 0) {
    this.items.set(item.id, { ...item, qnt: newQnt });
  }
}

function removeItem(item) {
  this.items.delete(item.id);
}
