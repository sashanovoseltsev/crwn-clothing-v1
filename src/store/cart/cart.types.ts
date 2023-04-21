import { CategoryItem } from "../categories/categories.types";

export enum CART_ACTION_TYPES {
  toggleCartOpened = "cart/TOGGLE_CART_OPENED",
  setCartItems = "cart/SET_CART_ITEMS"
}

export type CartState = {
  readonly isOpened: boolean,
  readonly items: Map<string, CartItem>;
}

export type CartItem = CategoryItem & {
  qnt: number
}