import { checkUserSession } from './store/user/user.reducer';
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./components/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { fetchCategoriesStart } from './store/categories/categories.reducer';

import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCategoriesArray } from './store/categories/categories.selectors';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);
  
  // we try to obtain categories from the store to check if they are available from local storage
  // to omit fetching them from db
  const cachedCategoriesArray = useSelector(selectCategoriesArray);

  useEffect(() => {
    if (!cachedCategoriesArray?.length) {
      dispatch(fetchCategoriesStart());
    }
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
