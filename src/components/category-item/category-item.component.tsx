import {
  CategoryContainer,
  CategoryImage,
  CategoryShopNowLink} from "./category-item.styles";

import { Category } from "../../store/categories/categories.types";

export type CategoryItemProps = {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  const { title, imageUrl, route } = category;

  return (
    <CategoryContainer>
      <CategoryImage url={imageUrl} />
      <CategoryShopNowLink to={route}>
        <h2>{title}</h2>
        <p>Shop now</p>
      </CategoryShopNowLink>
    </CategoryContainer>
  );
};

export default CategoryItem;
