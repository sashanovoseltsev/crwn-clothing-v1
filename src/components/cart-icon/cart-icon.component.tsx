import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { CartIconContainer } from "./cart-icon.styles";

const CartIcon = ({ count, onClickHandler }: { count: number; onClickHandler: React.MouseEventHandler<HTMLDivElement>}) => {
  return (
    <CartIconContainer onClick={onClickHandler}>
      <ShoppingIcon className="icon" />
      <span className="count">{count ?? 0}</span>
    </CartIconContainer>
  );
};

export default CartIcon;
