import { CartDropDownContainer } from "./cart-dropdown.styles";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCartOpened } from '../../store/cart/cart.action';
import { CartItem as CartItemType } from "../../store/cart/cart.types";

export type CartDropDownProps = {
  cartItems: CartItemType[];
  isOpened: boolean;
}

const CartDropdown = ({ cartItems, isOpened }: CartDropDownProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpened) {
      dispatch(toggleCartOpened());
    }
  }, [location])

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropDownContainer isOpened={isOpened}>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
        </div>
      ) : (
        <p className="empty-message">Cart is empty</p>
      )}
      <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
    </CartDropDownContainer>
  );
};

export default CartDropdown;
