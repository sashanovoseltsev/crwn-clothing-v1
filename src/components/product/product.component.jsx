import "./product.styles.scss";

import Button from "../button/button.component";

const Product = ({ product, onClickHandler }) => {
  const { name, price, imageUrl } = product;
  return (
    <div className="product">
      <div className="product__img-container">
        <img className="product__img" src={imageUrl} alt={name} />
      </div>
      <div className="product__footer">
        <p className="product__name">{name}</p>
        <p className="product__price">{price}$</p>
      </div>
      <Button buttonType="inverted" onClick={onClickHandler}>
        Add to cart
      </Button>
    </div>
  );
};

export default Product;
