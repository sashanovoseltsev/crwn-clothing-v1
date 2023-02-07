import { createContext, useState } from "react";

function addItem(item) {
  const { id } = item;

  const foundItem = this.items.get(id);
  if (!foundItem) {
    this.items.set(id, { value: item, qnt: 1 });
  } else {
    this.items.set(id, { ...foundItem, qnt: ++foundItem.qnt });
  }
}

function getTotalItems() {
  var count = 0;

  this.items.forEach(({ qnt }, _) => {
    count += qnt;
  });

  return count;
}

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
  });

  const value = { cartState, setCartState };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
