import { Category } from "../../store/categories/categories.types";
import CategoryItem from "../category-item/category-item.component";
import CategoriesContainer from "./categories-list.styles";

export type CategoriesListProps = {
  categories: Category[];
}

const CategoriesList = ({ categories }: CategoriesListProps) => {
  return (
    <CategoriesContainer>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </CategoriesContainer>
  );
};

export default CategoriesList;
