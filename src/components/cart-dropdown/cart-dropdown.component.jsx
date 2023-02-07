import "./cart-dropdown.styles.scss";

import Button from "../button/button.component";
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
      <Button>Go to Checkout</Button>
    </div>
  );
};

export default CartDropdown;
