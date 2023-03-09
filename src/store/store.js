import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';
import { CartItemsTransform } from './cart/cart.reducer';

const loggerMiddleware = (store) => {
  return (next) => {
    return (action) => {
      if (!action.type) {
        return next(action);
      }

      console.log('type:', action.type);
      console.log('payload:', action.payload);
      const currState = store.getState();
      console.log('current state', currState);

      next(action);
      
      const nextState = store.getState();
      console.log('next state', nextState);
    }
  }
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
  transforms: [CartItemsTransform]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(loggerMiddleware));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);