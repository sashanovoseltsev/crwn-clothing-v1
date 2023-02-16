import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import { CartContext } from "../../contexts/cart.context";

import Product from "../../components/product/product.component";

import "./shop.styles.scss";

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  const { cartState, setCartState } = useContext(CartContext);

  const addItem = (product) => {
    cartState.addItem(product);
    setCartState({ ...cartState });
  };

  console.log(categoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        return (
          <Fragment key={title}>
            <h2>{title}</h2>
            <div className="products-container">
              {categoriesMap[title].map((product) => {
                return (
                  <Product
                    key={product.id}
                    product={product}
                    onClickHandler={() => addItem(product)}
                  />
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Shop;
