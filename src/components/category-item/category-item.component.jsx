import {
  CategoryContainer,
  CategoryImage,
  CategoryBody,
} from "./category-item.styles.jsx";

import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;

  const navigate = useNavigate();

  return (
    <CategoryContainer onClick={() => navigate(route)}>
      <CategoryImage url={imageUrl} />
      <CategoryBody>
        <h2>{title}</h2>
        <p>Shop now</p>
      </CategoryBody>
    </CategoryContainer>
  );
};

export default CategoryItem;
