import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import "./navigation.styles.scss";

const Navigation = () => (
  <Fragment>
    <div className="navigation">
      <Link className="navigation__logo-container" to="/">
        <CrwnLogo className="navigation__logo" />
      </Link>
      <div className="navigation__links-container">
        <Link className="navigation__link" to="/shop">
          Shop
        </Link>
        <Link className="navigation__link" to="/auth">
          Sign-in
        </Link>
      </div>
    </div>
    <Outlet />
  </Fragment>
);

export default Navigation;
