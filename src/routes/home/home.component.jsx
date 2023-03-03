import { useState, useEffect, Fragment } from "react";
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/categories.selectors';

import CategoriesList from "../../components/categories-list/categories-list.component";

const Home = () => {

  const categoriesMap = useSelector(selectCategoriesMap);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories([...Object.values(categoriesMap)]);
  }, [categoriesMap]);

  return (
    <Fragment>
      <CategoriesList categories={categories} />
    </Fragment>
  );
};

export default Home;
