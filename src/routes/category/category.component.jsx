import { CategoryContainer, CategoryProducts } from "./category.styles.jsx";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/categories/categories.selectors.js';

import Product from "../../components/product/product.component";

const Category = () => {
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategoriesMap);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]?.items);
  }, [category, categoriesMap]);

  return (
    <CategoryContainer>
      <h2>{category}</h2>
      <CategoryProducts>
        {products && products.map((p) => <Product key={p.id} product={p} />)}
      </CategoryProducts>
    </CategoryContainer>
  );
};

export default Category;
