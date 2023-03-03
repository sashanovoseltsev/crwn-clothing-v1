import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../store/user/user.selectors'; 

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
  const currentUser = useSelector(selectCurrentUser);
  const { isOpened, toggleCartOpened, cartTotalItems, items } = useContext(CartContext);

  const handleSignOut = async () => {
    await signOutUser();
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
            count={cartTotalItems}
            onClickHandler={toggleCartOpened}
          />
        </LinkContainer>
        <CartDropdown
          cartItems={[...items.values()]}
          isOpened={isOpened}
        />
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
