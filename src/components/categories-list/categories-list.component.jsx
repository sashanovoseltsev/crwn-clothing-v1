import CategoryItem from "../category-item/category-item.component";
import CategoriesContainer from "./categories-list.styles.jsx";

const CategoriesList = ({ categories }) => {
  return (
    <CategoriesContainer>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </CategoriesContainer>
  );
};

export default CategoriesList;
