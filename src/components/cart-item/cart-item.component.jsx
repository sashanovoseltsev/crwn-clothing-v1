import { CartItemContainer } from "./cart-item.styles.jsx";

const CartItem = ({ item }) => {
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
};

export default CartItem;
