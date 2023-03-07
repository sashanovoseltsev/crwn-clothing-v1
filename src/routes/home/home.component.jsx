import { useState, useEffect, Fragment } from "react";
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/categories/categories.selectors';

import CategoriesList from "../../components/categories-list/categories-list.component";

const Home = () => {

  const categoriesMap = useSelector(selectCategories);
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
