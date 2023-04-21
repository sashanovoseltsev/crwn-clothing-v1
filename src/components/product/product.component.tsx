import { ProductContainer } from "./product.styles";

import Button from "../button/button.component";
import { BUTTON_TYPES } from "../button/button.component";

import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selectors';
import { CategoryItem } from "../../store/categories/categories.types";

export type ProductProps = {
  product: CategoryItem;
}

const Product = ({ product }: ProductProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, price, imageUrl } = product;
  return (
    <ProductContainer>
      <div className="img-container">
        <img className="img" src={imageUrl} alt={name} />
      </div>
      <div className="footer">
        <p>{name}</p>
        <p>{price}$</p>
      </div>
      <Button
        buttonType={BUTTON_TYPES.inverted}
        onClick={() => dispatch(addItemToCart(cartItems, product))}
      >
        Add to cart
      </Button>
    </ProductContainer>
  );
};

export default Product;
