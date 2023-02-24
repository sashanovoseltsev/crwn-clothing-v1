import { ProductContainer } from "./product.styles.jsx";

import Button from "../button/button.component";
import { BUTTON_TYPES } from "../button/button.component";

import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

const Product = ({ product }) => {
  const { cartState, setCartState } = useContext(CartContext);

  const addItem = (product) => {
    console.log("addItem");
    cartState.addItem(product);
    setCartState({ ...cartState });
  };

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
        onClick={() => addItem(product)}
      >
        Add to cart
      </Button>
    </ProductContainer>
  );
};

export default Product;