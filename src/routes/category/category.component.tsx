import { CategoryContainer, CategoryProducts } from "./category.styles";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import { selectCategories, selectCategoryIsLoading } from '../../store/categories/categories.selectors';

import Product from "../../components/product/product.component";
import Spinner from '../../components/spinner/spinner.component';

type CategoryRouteParams = {
  category: string;
}

const Category = () => {
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;

  const categoriesMap = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoryIsLoading);

  const [products, setProducts] = useState(categoriesMap[category]?.items);

  useEffect(() => {
    setProducts(categoriesMap[category]?.items);
  }, [category, categoriesMap]);

  return (
    <CategoryContainer>
      <h2>{category}</h2>
    {
      isLoading 
        ? ( <Spinner /> )
        : ( <CategoryProducts>
              {products && products.map((p) => <Product key={p.id} product={p} />)}
            </CategoryProducts> )
    }
    </CategoryContainer>
  );
};

export default Category;
