import { CheckoutContainer } from "./checkout.styles.jsx";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectCartItems, selectTotalPrice } from '../../store/cart/cart.selectors.js';
import { changeItemQuantity, removeItemFromCart } from '../../store/cart/cart.action.js';

const Checkout = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const cartTotalPrice = useSelector(selectTotalPrice);


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
            changeQuantity={(item, qnt) => dispatch(changeItemQuantity(items, item, qnt))}
            removeItem={(item) => dispatch(removeItemFromCart(items, item))}
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
