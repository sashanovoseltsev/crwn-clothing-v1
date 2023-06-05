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
}, 
  ({ item: prevItem}, {item: nextItem}) => {
      return prevItem.id === nextItem.id &&
          prevItem.name === nextItem.name &&
          prevItem.price === nextItem.price &&
          prevItem.qnt === nextItem.qnt &&
          prevItem.imageUrl === nextItem.imageUrl;
  }
);

export default CartItem;


// , (prevProps, nextProps) => {
//   if (prevProps !== nextProps) {
//     console.log(prevProps, nextProps);
//     return false
//   }
//   else {
//     return prevProps.item.id === nextProps.item.id &&
//     prevProps.item.name === nextProps.item.name &&
//     prevProps.item.price === nextProps.item.price &&
//     prevProps.item.qnt === nextProps.item.qnt &&
//     prevProps.item.imageUrl === nextProps.item.imageUrl;
//   } 
// }

// ({ item: prevItem}, {item: nextItem}) => {
//   console.log(prevItem, nextItem);
//   console.log('items equal', prevItem === prevItem);
//     return prevItem.id === nextItem.id &&
//         prevItem.name === nextItem.name &&
//         prevItem.price === nextItem.price &&
//         prevItem.qnt === nextItem.qnt &&
//         prevItem.imageUrl === nextItem.imageUrl;
// }
