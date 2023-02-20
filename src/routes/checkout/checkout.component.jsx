import { CheckoutContainer } from "./checkout.styles.jsx";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartState, setCartState } = useContext(CartContext);
  const items = [...cartState.items.values()];

  const changeQuantity = (item, qnt) => {
    cartState.changeQuantity(item, qnt);
    setCartState({ ...cartState });
  };

  const removeItem = (item) => {
    cartState.removeItem(item);
    setCartState({ ...cartState });
  };

  const countTotalPrice = () => {
    return cartState.getTotalPrice();
  };

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
      {items.map((i) => {
        return (
          <CheckoutItem
            changeQuantity={changeQuantity}
            removeItem={removeItem}
            item={i}
            key={i.id}
          />
        );
      })}
      <div className="footer">
        <span className="total">TOTAL:{" " + countTotalPrice()}$</span>
      </div>
    </CheckoutContainer>
  );
};

export default Checkout;
