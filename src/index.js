import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';

import { enableMapSet } from 'immer';

import App from "./App";
import { store, persistor } from './store/store';
import { stripePromise } from './utils/stripe/stripe.utils';

import { GlobalStyles } from "./global.styles";

// Required for redux-toolkit to work with Map objects inside states (cart state in particular)
enableMapSet();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// NOTE:
// loading={null} means that nothing inside PersistGate will be rendered until
// persisted info is obtained from storage (local storage in our case).
