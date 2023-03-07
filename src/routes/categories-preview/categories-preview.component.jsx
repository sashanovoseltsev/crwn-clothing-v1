import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/categories/categories.selectors';


import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategories);

  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title].items;
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
