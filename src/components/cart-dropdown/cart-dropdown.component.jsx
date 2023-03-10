import { CartDropDownContainer } from "./cart-dropdown.styles.jsx";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { useNavigate } from "react-router-dom";

const CartDropdown = ({ cartItems, isOpened }) => {
  const navigate = useNavigate();

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
