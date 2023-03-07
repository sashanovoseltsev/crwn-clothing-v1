import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

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


const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);