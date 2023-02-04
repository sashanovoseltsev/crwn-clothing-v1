import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const handleSignOut = async () => {
    await signOutUser();
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
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
