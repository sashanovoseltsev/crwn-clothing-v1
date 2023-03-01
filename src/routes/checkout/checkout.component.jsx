import { CheckoutContainer } from "./checkout.styles.jsx";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const {
    items,
    cartTotalPrice,
    changeItemQuantity,
    removeItemFromCart } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <div className="header">
        <div className="header-item">
          <span>Product</span>
        </div>
        <div className="header-item">
          <span>Description</span>
        </div>
        <div className="header-item">
          <span>Quantity</span>
        </div>
        <div className="header-item">
          <span>Price</span>
        </div>
        <div className="header-item">
          <span>Remove</span>
        </div>
      </div>
      {[...items.values()].map((i) => {
        return (
          <CheckoutItem
            changeQuantity={changeItemQuantity}
            removeItem={removeItemFromCart}
            item={i}
            key={i.id}
          />
        );
      })}
      <div className="footer">
        <span className="total">TOTAL:{" " + cartTotalPrice}$</span>
      </div>
    </CheckoutContainer>
  );
};

export default Checkout;
