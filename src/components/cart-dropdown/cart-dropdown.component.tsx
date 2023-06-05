import { FC, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { CartDropDownContainer, CartDropDownTotalPrice } from "./cart-dropdown.styles";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCartOpened } from '../../store/cart/cart.action';
import { selectCartItems, selectTotalPrice } from "../../store/cart/cart.selectors";

export type CartDropDownProps = {
  isOpened: boolean;
}

const CartDropdown: FC<CartDropDownProps> = ({ isOpened }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const items = [...useSelector(selectCartItems).values()];
  const totalPrice = useSelector(selectTotalPrice);

  const [prevLocation, setPrevLocation] = useState(location.pathname);

  useEffect(() => {
    if (isOpened && prevLocation !== location.pathname) {
      dispatch(toggleCartOpened());
    }
    setPrevLocation(location.pathname);
  }, [location]);

  const goToCheckoutHandler = useCallback(() => {
    navigate("/checkout");
  }, []);

  return (
    <CartDropDownContainer isOpened={isOpened}>
      {items.length > 0 ? (
        <>
          <div className="cart-items">
            {items.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })}
          </div>
          <CartDropDownTotalPrice>Total price: {totalPrice}$</CartDropDownTotalPrice>
        </>
      ) : (
        <p className="empty-message">Cart is empty</p>
      )}
      <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
    </CartDropDownContainer>
  );
};

export default CartDropdown;


  // useMemo is used to memoise return value of the function.
  // Function is recalculated based on 'watched' variables in the array.
  // const hundredCount = useMemo(() => {
  //   console.log('start');
  //   sleep(2000);
  //   console.log('end');
  //   return 100 + count;
  // }, [count]);

  // useCallback caches (memoizes) the function definition (not result of its execution).
  // Inside array you can connect it to some variable, and useCallback will create new instance of func if vars in array are changed.
  // NOTE!: function's context is also memoised! That means that all vars that were captured as closures will also be kept.
  // Please don't forget to add such var into 'watch' array in case your component requires 'fresh' instance of func with new context if this var is changed.
