import { compose, applyMiddleware, Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from '@redux-saga/core';

import { rootReducer, RootState } from './root-reducer';
import { CartItemsTransform } from './cart/cart.reducer';
import { loggerMiddleware } from './middleware/logger';
import { rootSaga } from './root-saga';

export type ExtendedPersistConfig = PersistConfig<RootState> & {
  blacklist: (keyof RootState)[];
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
  transforms: [CartItemsTransform]
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && loggerMiddleware,
  sagaMiddleware]
.filter((middleware): middleware is Middleware => Boolean(middleware));

// const composeEnhancers = (process.env.NODE_ENV !== 'production' &&
//   window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) 
//  || compose;

// const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));

export const store = configureStore({ reducer: persistedReducer, middleware: middleWares });

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), ...middleWares]
// });

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);