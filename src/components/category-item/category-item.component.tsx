import {
  CategoryContainer,
  CategoryImage,
  CategoryBody,
} from "./category-item.styles";

import { useNavigate } from "react-router-dom";
import { Category } from "../../store/categories/categories.types";

export type CategoryItemProps = {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
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
