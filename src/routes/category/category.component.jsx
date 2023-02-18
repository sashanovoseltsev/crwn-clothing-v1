import "./category.styles.scss";

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.context";

import Product from "../../components/product/product.component";

const Category = () => {
  const { category } = useParams();

  const { categoriesMap } = useContext(CategoriesContext);

  const [products, setProducts] = useState(categoriesMap[category]);

  console.log("Category " + category);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2>{category.toUpperCase()}</h2>
      <div className="category__products">
        {products && products.map((p) => <Product key={p.id} product={p} />)}
      </div>
    </>
  );
};

export default Category;
