import "./checkout.styles.scss";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartState, setCartState } = useContext(CartContext);
  const items = [...cartState.items.values()];

  const changeQuantity = (item, qnt) => {
    const newQnt = item.qnt + qnt;
    if (newQnt > 0) {
      cartState.items.set(item.value.id, { ...item, qnt: newQnt });
      setCartState({ ...cartState });
    }
  };

  const removeItem = (item) => {
    cartState.items.delete(item.value.id);
    setCartState({ ...cartState });
  };

  return (
    <div className="checkout">
      <div className="checkout__header">
        <span>Product</span>
        <span>Description</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Remove</span>
      </div>
      {items.map((i) => {
        return (
          <CheckoutItem
            changeQuantity={changeQuantity}
            removeItem={removeItem}
            item={i}
          />
        );
      })}
      <div className="checkout__footer">
        <span className="checkout__total">
          TOTAL:
          {" " +
            items.reduce((total, el) => {
              return total + el.qnt * el.value.price;
            }, 0)}
          $
        </span>
      </div>
    </div>
  );
};

export default Checkout;
