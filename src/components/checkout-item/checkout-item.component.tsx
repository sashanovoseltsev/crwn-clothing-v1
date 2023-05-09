//import "./checkout-item.styles.scss";
import { FC, memo } from 'react';

import { CheckoutItemContainer } from "./checkout-item.styles";
import { CartItem } from "../../store/cart/cart.types";

export type CheckOutItemProps = {
  item: CartItem;
  changeQuantity: (item: CartItem, qnt: number) => void;
  removeItem: (item: CartItem) => void;
}

const CheckoutItem: FC<CheckOutItemProps> = ({ item, changeQuantity, removeItem }) => {
  const { imageUrl, name, price, qnt: quantity } = item;

  return (
    <CheckoutItemContainer>
      <div className="img-contaienr">
        <img className="img" src={imageUrl} alt={name} />
      </div>
      <span className="text">{name}</span>

      <div className="quantity-container">
        <span className="btn" onClick={() => changeQuantity(item, -1)}>
          &lsaquo;
        </span>
        <span className="qnt">{quantity}</span>
        <span className="btn" onClick={() => changeQuantity(item, 1)}>
          &rsaquo;
        </span>
      </div>
      <span className="price">{price * quantity}$</span>
      <span className="remove" onClick={() => removeItem(item)}>
        &times;
      </span>
    </CheckoutItemContainer>
  );
};

// const CheckoutItem: FC<CheckOutItemProps> = memo(({ item, changeQuantity, removeItem }) => {
//   const { imageUrl, name, price, qnt: quantity } = item;

//   return (
//     <CheckoutItemContainer>
//       <div className="img-contaienr">
//         <img className="img" src={imageUrl} alt={name} />
//       </div>
//       <span className="text">{name}</span>

//       <div className="quantity-container">
//         <span className="btn" onClick={() => changeQuantity(item, -1)}>
//           &lsaquo;
//         </span>
//         <span className="qnt">{quantity}</span>
//         <span className="btn" onClick={() => changeQuantity(item, 1)}>
//           &rsaquo;
//         </span>
//       </div>
//       <span className="price">{price * quantity}$</span>
//       <span className="remove" onClick={() => removeItem(item)}>
//         &times;
//       </span>
//     </CheckoutItemContainer>
//   );
// }, (prevProps, nextProps) => {
//   const propsEqual = prevProps.item.qnt === nextProps.item.qnt;
//   console.warn("prevCnt", prevProps.item.qnt, "nextCnt", nextProps.item.qnt, "propsEqual: ", propsEqual);
//   return propsEqual;
// });

export default CheckoutItem;
