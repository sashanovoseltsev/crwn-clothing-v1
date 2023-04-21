
// or simply (store) => (next) => (action) => {
// ... 

import { Middleware } from "redux";
import { RootState } from "../root-reducer";

export const loggerMiddleware: Middleware<{}, RootState> = (store) => {
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