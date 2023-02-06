import "./cart-dropdown.styles.scss";

import Button from "../button/button.component";

const CartDropdown = ({ isOpened }) => {
  console.log("CartDropdown", isOpened);
  return (
    <div className={`cart-dropdown ${isOpened ? "" : "cart-dropdown--hidden"}`}>
      <Button>Go to Checkout</Button>
    </div>
  );
};

export default CartDropdown;
