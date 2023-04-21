import { useState, useEffect, Fragment } from "react";
import { useSelector } from 'react-redux';
import { selectCategories, selectCategoryIsLoading } from '../../store/categories/categories.selectors';
import Spinner from '../../components/spinner/spinner.component';

import CategoriesList from "../../components/categories-list/categories-list.component";
import { Category } from "../../store/categories/categories.types";

const Home = () => {
  const categoriesMap = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoryIsLoading);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories([...Object.values(categoriesMap)]);
  }, [categoriesMap]);

  return (
    <>
      {
        isLoading 
          ? <Spinner />
          : <CategoriesList categories={categories} />
      }
    </>
  );
};

export default Home;
