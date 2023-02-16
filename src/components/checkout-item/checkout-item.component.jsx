import "./checkout-item.styles.scss";

const CheckoutItem = ({ item, changeQuantity, removeItem }) => {
  const { imageUrl, name, price, qnt: quantity } = item;

  return (
    <div className="checkout-item">
      <div className="checkout-item__img-contaienr">
        <img className="checkout-item__img" src={imageUrl} alt={name} />
      </div>
      <span className="checkout-item__text">{name}</span>

      <div className="checkout-item__quantity-container">
        <span
          className="checkout-item__btn"
          onClick={() => changeQuantity(item, -1)}
        >
          &lsaquo;
        </span>
        <span className="checkout-item__qnt">{quantity}</span>
        <span
          className="checkout-item__btn"
          onClick={() => changeQuantity(item, 1)}
        >
          &rsaquo;
        </span>
      </div>
      <span className="checkout-item__price">{price * quantity}$</span>
      <span className="checkout-item__remove" onClick={() => removeItem(item)}>
        &times;
      </span>
    </div>
  );
};

export default CheckoutItem;
