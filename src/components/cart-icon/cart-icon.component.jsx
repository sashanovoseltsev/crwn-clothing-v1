import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = ({ count, onClickHandler }) => {
  return (
    <div className="cart-icon" onClick={onClickHandler}>
      <ShoppingIcon className="cart-icon__icon" />
      <span className="cart-icon__count">{count ?? 0}</span>
    </div>
  );
};

export default CartIcon;
