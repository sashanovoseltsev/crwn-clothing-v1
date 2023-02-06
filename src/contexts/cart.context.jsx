import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  cartState: {
    items: [],
    isOpened: false,
  },
  setCartState: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState({
    items: [],
    isOpened: false,
  });

  const value = { cartState, setCartState };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
