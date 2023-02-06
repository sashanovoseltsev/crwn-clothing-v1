import { useState, useEffect, createContext } from "react";

import SHOP_DATA from "../assets/shop-data.json";

export const ProductsContext = createContext({
  products: [],
  setProducts: () => {},
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const value = { products, setProducts };

  useEffect(() => {
    setProducts(SHOP_DATA);
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
