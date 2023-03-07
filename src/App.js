import { setCurrentUser } from './store/user/user.action';
import { setCategories } from './store/categories/categories.action';
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./components/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getDocumentsFromCollection } from './utils/firebase/firebase.utils';

import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';


const COLLECTION_CATEGORIES = "categories";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    var unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe; // seems that in current version of Firebase unsubscribe doesn't actually do unsubscribe action
  }, []);

  useEffect(() => {
    // addCollectionAndDocuments("categories", SHOP_DATA);

    const getCategories = async () => {
      const categoriesArray = await getDocumentsFromCollection(
        COLLECTION_CATEGORIES
      );
      dispatch(setCategories(categoriesArray));
    };
    getCategories();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
