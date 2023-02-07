import { createContext, useState } from "react";

export const CartContext = createContext({
  cartState: {
    items: new Map(),
    isOpened: false,
  },
  setCartState: () => {},
  addItem: () => {},
});

export const CartProvider = ({ children }) => {
  console.log("CartProvider");

  const [cartState, setCartState] = useState({
    items: new Map(),
    isOpened: false,
  });

  const addItem = (product) => {
    const { id } = product;

    const item = cartState.items.get(id);
    if (!item) {
      cartState.items.set(id, { item: product, qnt: 1 });
    } else {
      cartState.items.set(id, { ...item, qnt: ++item.qnt });
    }
    setCartState({ ...cartState });
    console.log("product was added", product);
  };

  const value = { cartState, setCartState, addItem };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
