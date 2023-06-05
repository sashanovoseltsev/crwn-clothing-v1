import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentUser } from '../../store/user/user.selectors'; 
import { signOut } from '../../store/user/user.action';

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import {
  NavigationContainer,
  LogoContainer,
  LinkContainer,
  NavLink,
} from "./navigation.styles";

import { selectCartIsOpened, selectCartItems } from '../../store/cart/cart.selectors';
import { toggleCartOpened } from '../../store/cart/cart.action';

const Navigation = () => {

  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const isOpened = useSelector(selectCartIsOpened);

  const handleSignOut = async () => {
    dispatch(signOut());
  };

  return (
    <>
      <NavigationContainer isOpened={isOpened}>
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
            onClickHandler={() => dispatch(toggleCartOpened())}
          />
        </LinkContainer>
        <CartDropdown 
          isOpened={isOpened}
        />
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
