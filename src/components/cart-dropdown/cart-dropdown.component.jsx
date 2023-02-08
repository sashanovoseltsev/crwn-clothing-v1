import "./cart-dropdown.styles.scss";

// import { Link } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { useNavigate } from "react-router-dom";

const CartDropdown = ({ cartItems, isOpened }) => {
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className={`cart-dropdown ${isOpened ? "" : "cart-dropdown--hidden"}`}>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => {
            return <CartItem key={item.value.id} item={item} />;
          })}
        </div>
      ) : (
        <p className="empty-message">Cart is empty</p>
      )}
      <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
