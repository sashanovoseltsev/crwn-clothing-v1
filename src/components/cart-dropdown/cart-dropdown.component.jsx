import "./cart-dropdown.styles.scss";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = ({ cartItems, isOpened }) => {
  console.log(cartItems.size);

  return (
    <div
      key="cart-dropdown"
      className={`cart-dropdown ${isOpened ? "" : "cart-dropdown--hidden"}`}
    >
      {cartItems.size > 0 ? (
        <div key="cart-items" className="cart-items">
          {[...cartItems.values()].map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
        </div>
      ) : (
        <p key="empty-msg" className="empty-message">
          Cart is empty
        </p>
      )}
      <Button>Go to Checkout</Button>
    </div>
  );
};

export default CartDropdown;
