import { useState, useEffect, Fragment } from "react";
import { useSelector } from 'react-redux';
import { selectCategories, selectCategoryIsLoading } from '../../store/categories/categories.selectors';
import Spinner from '../../components/spinner/spinner.component';

import CategoriesList from "../../components/categories-list/categories-list.component";

const Home = () => {

  const categoriesMap = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoryIsLoading);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories([...Object.values(categoriesMap)]);
  }, [categoriesMap]);

  return (
    <Fragment>
      {
        isLoading 
          ? <Spinner />
          : <CategoriesList categories={categories} />
      }
    </Fragment>
  );
};

export default Home;
