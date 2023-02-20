import { CategoryPreviewContainer } from "./category-preview.styles.jsx";

import Button from "../button/button.component";
import Product from "../product/product.component";
import { useNavigate } from "react-router-dom";

const CategoryPreview = ({ title, products }) => {
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/shop/" + title);
  };

  return (
    <CategoryPreviewContainer>
      <h2 className="title-container">
        <Button onClick={goToCheckoutHandler}>{title.toUpperCase()}</Button>
      </h2>
      <div className="category-container">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => {
            return <Product key={product.id} product={product} />;
          })}
      </div>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
