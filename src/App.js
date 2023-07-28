import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCategoriesArray } from './store/categories/categories.selectors';

import { checkUserSession } from './store/user/user.action';
import { fetchCategoriesStart } from './store/categories/categories.action';
// import Home from "./routes/home/home.component";
// import Navigation from "./routes/navigation/navigation.component";
// import Authentication from "./components/authentication/authentication.component";
// import Shop from "./routes/shop/shop.component";
// import Checkout from "./routes/checkout/checkout.component";

import Spinner from './components/spinner/spinner.component';

import { GlobalStyles } from "./global.styles";

const Home = lazy(() => import("./routes/home/home.component"));
const Navigation = lazy(() => import("./routes/navigation/navigation.component"));
const Authentication = lazy(() => import("./components/authentication/authentication.component"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));

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
    <Suspense fallback={<Spinner />}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index={true} element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
