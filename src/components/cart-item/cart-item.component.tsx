import { FC, memo } from "react"; 

import { CartItem as CartItemType } from "../../store/cart/cart.types.js";
import { CartItemContainer } from "./cart-item.styles";

export type CartItemProps = {
  item: CartItemType;
}
const CartItem: FC<CartItemProps> = memo(({ item }) => {
  const { name, price, imageUrl, qnt: quantity } = item;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <div className="details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x {price}$
        </span>
      </div>
    </CartItemContainer>
  );
});

export default CartItem;
