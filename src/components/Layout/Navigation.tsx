import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";
import AuthContext from "../../store/AuthContext";

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/" exact>
            Home
          </NavLink>
        </li>
        {!authCtx.isLoggedIn && (
          <>
            <li>
              <NavLink activeClassName={classes.active} to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/signup">
                Signup
              </NavLink>
            </li>
          </>
        )}

        {authCtx.isLoggedIn && (
          <>
            <li>
              <button onClick={authCtx.logout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
