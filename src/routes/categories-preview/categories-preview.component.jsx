import { useSelector } from 'react-redux';
import { selectCategories, selectCategoryIsLoading } from '../../store/categories/categories.selectors';


import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from '../../components/spinner/spinner.component.jsx';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoryIsLoading);

  return (
    <>
      { isLoading 
          ? <Spinner /> 
          : Object.keys(categoriesMap).map((title) => {
              const products = categoriesMap[title].items;
              return (
                <CategoryPreview key={title} title={title} products={products} />
              );
      })}
    </>
  );
};

export default CategoriesPreview;
