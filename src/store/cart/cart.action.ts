import { createAction, Action, ActionWithPayload, withMatcher } from '../../utils/reducer/reducer.utils';
import { CategoryItem } from "../categories/categories.types";
import { CartItem, CART_ACTION_TYPES } from "./cart.types";

export type ToggleCartOpenedActionType = Action<CART_ACTION_TYPES.toggleCartOpened>;
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.setCartItems, Map<string, CartItem>>;

export const toggleCartOpened = withMatcher((): ToggleCartOpenedActionType => createAction(CART_ACTION_TYPES.toggleCartOpened));

export const setCartItems = withMatcher((items: Map<string, CartItem>): SetCartItems => createAction(CART_ACTION_TYPES.setCartItems, items));

export const addItemToCart = (items: Map<string, CartItem>, item: CategoryItem): SetCartItems => {
  items = addItem(items, item);
  return setCartItems(items);
}

export const removeItemFromCart = (items: Map<string, CartItem>, item: CartItem): SetCartItems => {
  items = removeItem(items, item);
  return setCartItems(items);
}

export const changeItemQuantity = (items: Map<string, CartItem>, item: CartItem, quantity: number) => {
  items = changeQuantity(items, item, quantity);
  return setCartItems(items);
}

// helpers

function addItem(items: Map<string, CartItem>, item: CategoryItem): Map<string, CartItem> {
  const id = item.id.toString();
  
  const foundItem = items.get(id);
  if (!foundItem) {
    items.set(id, { ...item, qnt: 1 });
  } else {
    items.set(id, { ...foundItem, qnt: foundItem.qnt + 1 });
    //foundItem.qnt += 1; // this causes a lot of troubles with re-rendering (esp. when using React.memo) cause it doesn't change items ref.
  }
  
  return items;
}

function changeQuantity(items: Map<string, CartItem>, item: CartItem, qnt: number): Map<string, CartItem> {
  const newQnt = item.qnt + qnt;
  if (newQnt > 0) {
    items.set(item.id.toString(), { ...item, qnt: newQnt });
  }
  
  return items;
}

function removeItem(items: Map<string, CartItem>, item: CartItem): Map<string, CartItem> {
  items.delete(item.id.toString());
  
  return items;
}