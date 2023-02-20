import {
  CategoryContainer,
  CategoryImage,
  CategoryBody,
} from "./category-item.styles.jsx";

const CategoryItem = ({ category }) => {
  const { title, imageUrl } = category;

  return (
    <CategoryContainer>
      <CategoryImage url={imageUrl} />
      <CategoryBody>
        <h2>{title}</h2>
        <p>Shop now</p>
      </CategoryBody>
    </CategoryContainer>
  );
};

export default CategoryItem;
