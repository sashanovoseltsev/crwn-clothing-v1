import "./category-preview.styles.scss";

import Button from "../button/button.component";
import Product from "../product/product.component";
import { useNavigate } from "react-router-dom";

const CategoryPreview = ({ title, products }) => {
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/shop/" + title);
  };

  return (
    <div className="category-preview">
      <h2 className="category-preview__title-container">
        <Button onClick={goToCheckoutHandler}>{title.toUpperCase()}</Button>
      </h2>
      <div className="category-preview__category-container">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => {
            return <Product key={product.id} product={product} />;
          })}
      </div>
    </div>
  );
};

export default CategoryPreview;
