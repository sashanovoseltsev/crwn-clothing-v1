import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import { CartContext } from "../../contexts/cart.context";

import Product from "../../components/product/product.component";

import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  const { addItem } = useContext(CartContext);

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
