import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import { CartContext } from "../../contexts/cart.context";

import Product from "../../components/product/product.component";

import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  const { cartState, setCartState } = useContext(CartContext);

  const addToCartHandler = (product) => {
    console.log("product was added", product);
    cartState.items.push(product);
    setCartState(cartState);
  };

  return (
    <div className="products-container">
      {products.map((product) => {
        return (
          <Product
            key={product.id}
            product={product}
            addToCartHandler={addToCartHandler}
          />
        );
      })}
    </div>
  );
};

export default Shop;
