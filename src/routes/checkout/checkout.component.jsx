import "./checkout.styles.scss";

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
    <div className="checkout">
      <div className="checkout__header">
        <div className="checkout__header-item">
          <span>Product</span>
        </div>
        <div className="checkout__header-item">
          <span>Description</span>
        </div>
        <div className="checkout__header-item">
          <span>Quantity</span>
        </div>
        <div className="checkout__header-item">
          <span>Price</span>
        </div>
        <div className="checkout__header-item">
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
      <div className="checkout__footer">
        <span className="checkout__total">
          TOTAL:{" " + countTotalPrice()}$
        </span>
      </div>
    </div>
  );
};

export default Checkout;
