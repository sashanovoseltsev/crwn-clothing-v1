import { createSlice } from "@reduxjs/toolkit";
import { createTransform } from 'redux-persist';

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

const INITIAL_VALUE = {
  isOpened: false,
  items: new Map()
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_VALUE,
  reducers: {
    toggleCartOpened(state, _) {
      state.isOpened = !state.isOpened;
    },
    addItemToCart(state, action) {
      state.items = new Map(addItem(state.items, action.payload));
    },
    changeItemQuantity(state, action) {
      state.items = new Map(changeQuantity(state.items, action.payload.item, action.payload.qnt));
    },
    removeItemFromCart(state, action) {
      state.items = new Map(removeItem(state.items, action.payload));
    }
  }
});

export const { toggleCartOpened, addItemToCart, changeItemQuantity, removeItemFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;


function addItem(items, item) {
  const id = item.id.toString();
  // convert id to string. 
  // Required for correct persist/rehydrate process during redux-persist store to local storage procedure

  const foundItem = items.get(id);
  if (!foundItem) {
    items.set(id, { ...item, qnt: 1 });
  } else {
    items.set(id, { ...foundItem, qnt: ++foundItem.qnt });
  }

  return items;
}

function changeQuantity(items, item, qnt) {
  const newQnt = item.qnt + qnt;
  if (newQnt > 0) {
    items.set(item.id.toString(), { ...item, qnt: newQnt });
  }

  return items;
}

function removeItem(items, item) {
  items.delete(item.id.toString());

  return items;
}