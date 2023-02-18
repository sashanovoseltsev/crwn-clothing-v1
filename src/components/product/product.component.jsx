import "./product.styles.scss";

import Button from "../button/button.component";

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
    <div className="product">
      <div className="product__img-container">
        <img className="product__img" src={imageUrl} alt={name} />
      </div>
      <div className="product__footer">
        <p>{name}</p>
        <p>{price}$</p>
      </div>
      <Button buttonType="inverted" onClick={() => addItem(product)}>
        Add to cart
      </Button>
    </div>
  );
};

export default Product;
