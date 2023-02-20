//import "./checkout-item.styles.scss";

import { CheckoutItemContainer } from "./checkout-item.styles";

const CheckoutItem = ({ item, changeQuantity, removeItem }) => {
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

export default CheckoutItem;
