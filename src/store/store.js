import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';
import { CartItemsTransform } from './cart/cart.reducer';
import { loggerMiddleware } from './middleware/logger';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
  transforms: [CartItemsTransform]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && loggerMiddleware, thunk].filter(Boolean);

const composeEnhancers = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);