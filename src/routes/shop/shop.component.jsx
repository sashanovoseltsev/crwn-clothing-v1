import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import { CartContext } from "../../contexts/cart.context";

import Product from "../../components/product/product.component";

import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  const { cartState, setCartState } = useContext(CartContext);

  const addItem = (product) => {
    cartState.addItem(product);
    setCartState({ ...cartState });
  };

  return (
    <div className="products-container">
      {products.map((product) => {
        return (
          <Product
            key={product.id}
            product={product}
            onClickHandler={() => addItem(product)}
          />
        );
      })}
    </div>
  );
};

export default Shop;
