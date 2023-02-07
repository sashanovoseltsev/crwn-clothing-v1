import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { cartState, setCartState } = useContext(CartContext);

  const handleSignOut = async () => {
    await signOutUser();
  };

  const handleCartIconClick = () => {
    cartState.isOpened = !cartState.isOpened;
    setCartState({ ...cartState });
  };

  const countItems = (items) => {
    var count = 0;

    console.log(items);
    items.forEach((v, _) => {
      count += v.qnt;
    });

    return count;
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="navigation__logo-container" to="/">
          <CrwnLogo className="navigation__logo" />
        </Link>
        <div className="navigation__links-container">
          <Link className="navigation__link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <button
              type="button"
              className="navigation__link--btn"
              onClick={handleSignOut}
            >
              sign out
            </button>
          ) : (
            <Link className="navigation__link" to="/auth">
              {"sign in "}
            </Link>
          )}
          <CartIcon
            count={countItems(cartState.items)}
            onCartIconClick={handleCartIconClick}
          />
        </div>
        <CartDropdown
          cartItems={cartState.items}
          isOpened={cartState.isOpened}
        />
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
