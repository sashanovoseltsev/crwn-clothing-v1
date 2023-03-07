import { useState, useEffect, createContext } from "react";

//import SHOP_DATA from "../assets/shop-data.js";

import {
  addCollectionAndDocuments,
  getDocumentsFromCollection,
} from "../utils/firebase/firebase.utils";

const COLLECTION_CATEGORIES = "categories";

export const CategoriesContext = createContext({});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  const value = { categoriesMap, setCategoriesMap };

  useEffect(() => {
    // addCollectionAndDocuments("categories", SHOP_DATA);

    const getCategories = async () => {
      const categoriesMap = await getDocumentsFromCollection(
        COLLECTION_CATEGORIES
      );
      console.log(categoriesMap);
      setCategoriesMap(categoriesMap);
    };
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
