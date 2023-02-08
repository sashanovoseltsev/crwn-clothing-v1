import "./cart-dropdown.styles.scss";

import { Link } from "react-router-dom";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = ({ cartItems, isOpened }) => {
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
      <Link className="cart-dropdown__btn button-container" to="/checkout">
        Go to checkout
      </Link>
    </div>
  );
};

export default CartDropdown;
