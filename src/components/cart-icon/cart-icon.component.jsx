import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = ({ onCartIconClick }) => {
  return (
    <div className="cart-icon" onClick={onCartIconClick}>
      <ShoppingIcon className="cart-icon__icon" />
      <span className="cart-icon__count">0</span>
    </div>
  );
};

export default CartIcon;
