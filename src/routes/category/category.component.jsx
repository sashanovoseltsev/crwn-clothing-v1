import { CategoryContainer, CategoryProducts } from "./category.styles.jsx";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import { selectCategories, selectCategoryIsLoading } from '../../store/categories/categories.selectors.js';

import Product from "../../components/product/product.component";
import Spinner from '../../components/spinner/spinner.component.jsx';

const Category = () => {
  const { category } = useParams();

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
