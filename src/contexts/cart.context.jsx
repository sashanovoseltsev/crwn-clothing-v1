import { createContext, useState } from "react";

// export const CartContext = createContext({
//   cartState: {
//     items: new Map(),
//     isOpened: false,
//     addItem: () => {},
//     getTotalItems: () => {},
//   },
//   setCartState: () => {},
// });

// If we can provide just empty object as default context, then why define example structure?
export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState({
    items: new Map(),
    isOpened: false,
    addItem,
    getTotalItems,
    getTotalPrice,
    changeQuantity,
    removeItem,
  });

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
