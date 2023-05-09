import { FC, useCallback, useMemo, useState } from "react";

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

// const sleep = (milliseconds: number): void => {
//   var start = new Date().getTime();
//   for (var i = 0; i< 1e7; i++) {
//     if (new Date().getTime() - start > milliseconds) {
//       break;
//     }
//   }
// }

const CartDropdown: FC<CartDropDownProps> = ({ cartItems, isOpened }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [ count, setCount ] = useState(0);

  useEffect(() => {
    if (isOpened) {
      dispatch(toggleCartOpened());
    }
  }, [location]);

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
  const goToCheckoutHandler = useCallback(() => {
    navigate("/checkout");
  }, []);

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
      {/* {hundredCount} */}
      {/* <Button onClick={() => setCount(count + 1)}>Go to checkout</Button> */}
    </CartDropDownContainer>
  );
};

export default CartDropdown;
