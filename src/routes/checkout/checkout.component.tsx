import { CheckoutContainer, HeaderItem, Header } from "./checkout.styles";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from '../../components/payment-form/payment-form.component';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectTotalPrice } from '../../store/cart/cart.selectors';
import { changeItemQuantity, removeItemFromCart } from '../../store/cart/cart.action';

const Checkout = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const cartTotalPrice = useSelector(selectTotalPrice);

  return (
    <CheckoutContainer>
      <Header>
        <HeaderItem>
          <span>Product</span>
        </HeaderItem>
        <HeaderItem>
          <span>Description</span>
        </HeaderItem>
        <HeaderItem>
          <span>Quantity</span>
        </HeaderItem>
        <HeaderItem>
          <span>Price</span>
        </HeaderItem>
        <HeaderItem>
          <span>Remove</span>
        </HeaderItem>
      </Header>
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
        <div><span className="total">TOTAL:{" " + cartTotalPrice}$</span></div>
        <PaymentForm />
      </div>
    </CheckoutContainer>
  );
};

export default Checkout;
