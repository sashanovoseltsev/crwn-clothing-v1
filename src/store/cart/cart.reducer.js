import { CART_ACTION_TYPES } from './cart.type';
import { createTransform } from 'redux-persist';

const INITIAL_VALUE = {
  isOpened: false,
  items: new Map()
}

export const CartItemsTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    return { ...inboundState, items: Object.fromEntries(inboundState.items)}
  },
  // transform state being rehydrated
  (outboundState, key) => {
    return { ...outboundState, items: new Map(Object.entries(outboundState.items))}
  },
  // transform state being rehydrated
  {whitelist: ['cart']}
);

export const cartReducer = (state = INITIAL_VALUE, action) => {
  const {type, payload} = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        items: new Map(payload)
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