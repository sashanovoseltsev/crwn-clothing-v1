import { ProductContainer } from "./product.styles.jsx";

import Button from "../button/button.component";
import { BUTTON_TYPES } from "../button/button.component";

import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.reducer';

const Product = ({ product }) => {
  const dispatch = useDispatch();

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
        onClick={() => dispatch(addItemToCart(product))}
      >
        Add to cart
      </Button>
    </ProductContainer>
  );
};

export default Product;
