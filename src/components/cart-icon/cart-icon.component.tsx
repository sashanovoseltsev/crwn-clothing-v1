import { useSelector } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { CartIconContainer } from "./cart-icon.styles";
import { selectTotalItems } from "../../store/cart/cart.selectors";

const CartIcon = ({ onClickHandler }: { onClickHandler: React.MouseEventHandler<HTMLDivElement>}) => {

  const cartTotalItems = useSelector(selectTotalItems);

  return (
    <CartIconContainer onClick={onClickHandler}>
      <ShoppingIcon className="icon" />
      <span className="count">{cartTotalItems ?? 0}</span>
    </CartIconContainer>
  );
};

export default CartIcon;
