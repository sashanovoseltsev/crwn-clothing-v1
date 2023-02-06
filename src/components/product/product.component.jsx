import "./product.styles.scss";

import Button from "../button/button.component";

const Product = ({ product, addToCartHandler }) => {
  const { name, price, imageUrl } = product;
  return (
    <div className="product">
      <img className="product__img" src={imageUrl} alt={name} />
      <div className="product__footer">
        <p className="product__name">{name}</p>
        <p className="product__price">{price}</p>
      </div>
      <Button buttonType="inverted" onClick={() => addToCartHandler(product)}>
        Add to cart
      </Button>
    </div>
  );
};

export default Product;
