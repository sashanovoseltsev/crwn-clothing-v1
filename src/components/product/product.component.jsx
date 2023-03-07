import { ProductContainer } from "./product.styles.jsx";

import Button from "../button/button.component";
import { BUTTON_TYPES } from "../button/button.component";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selectors.js';
import { addItemToCart } from '../../store/cart/cart.action.js';

const Product = ({ product }) => {
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
