import { AnyAction } from 'redux';
import { createTransform } from 'redux-persist';
import { CartState } from "./cart.types";
import { toggleCartOpened, setCartItems } from "./cart.action";

const INITIAL_VALUE: CartState = {
  isOpened: false,
  items: new Map()
}

export const cartReducer = (
  state = INITIAL_VALUE,
  action: AnyAction
): CartState => {
  if (toggleCartOpened.match(action)) {
    return { ...state, isOpened: !state.isOpened }
  }

  if (setCartItems.match(action)) {
    return { ...state, items: new Map(action.payload) };
  }

  return state;
}

// Transform is required to persist Map<string, CartItem> into local storage as Object.
// (only JSON ready types can be stored without transforms).
export const CartItemsTransform = createTransform(
  (inboundState: CartState, _): any => {
      console.log('inboundState:', inboundState);
      const res = {
          ...inboundState,
          items: Object.fromEntries(inboundState.items.entries())
      };
      console.log('state to store:', res);
      return res;
  },
  (outboundState: any, _): CartState => {
      console.log('outboundState:', outboundState);
      const res = {
          ...outboundState,
          items: new Map(Object.entries(outboundState.items))
      };
      console.log('state to re-store:', res);
      return res;
  },
  {
      whitelist: ['cart']
  }
);