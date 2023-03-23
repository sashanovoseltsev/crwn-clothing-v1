//import { compose, createStore, applyMiddleware } from 'redux';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from '@redux-saga/core';

import { rootReducer } from './root-reducer';
import { CartItemsTransform } from './cart/cart.reducer';
import { loggerMiddleware } from './middleware/logger';
import { rootSaga } from './root-saga';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
  transforms: [CartItemsTransform]
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && loggerMiddleware,
  sagaMiddleware]
.filter(Boolean);

// const composeEnhancers = (process.env.NODE_ENV !== 'production' &&
//   window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) 
//  || compose;

// const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));

//export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), ...middleWares]
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);