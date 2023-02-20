import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import {
  NavigationContainer,
  LogoContainer,
  LinkContainer,
  NavLink,
} from "./navigation.styles.jsx";

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

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="navigation__logo" />
        </LogoContainer>
        <LinkContainer>
          <NavLink to="/shop">Shop</NavLink>
          {currentUser ? (
            <NavLink as="button" type="button" onClick={handleSignOut}>
              sign out
            </NavLink>
          ) : (
            <NavLink to="/auth">{"sign in "}</NavLink>
          )}
          <CartIcon
            count={cartState.getTotalItems()}
            onClickHandler={handleCartIconClick}
          />
        </LinkContainer>
        <CartDropdown
          cartItems={[...cartState.items.values()]}
          isOpened={cartState.isOpened}
        />
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
