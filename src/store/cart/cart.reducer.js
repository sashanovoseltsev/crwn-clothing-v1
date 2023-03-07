import { CART_ACTION_TYPES } from './cart.type';

const INITIAL_VALUE = {
  isOpened: false,
  items: new Map()
}

export const cartReducer = (state = INITIAL_VALUE, action) => {
  const {type, payload} = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        items: payload
      }
    case CART_ACTION_TYPES.SET_IS_OPENED:
      return {
        ...state,
        isOpened: payload
      }
    default:
      return state;
  }
}