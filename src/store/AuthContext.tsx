import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const tokenStoreKey = "token";
  const storedToken = localStorage.getItem(tokenStoreKey);
  const [token, setToken] = useState(storedToken !== null ? storedToken : "");

  const loginHandler = (token: string) => {
    localStorage.setItem(tokenStoreKey, token);
    setToken(token);
  };

  const logoutHandler = () => {
    localStorage.removeItem(tokenStoreKey);
    setToken("");
  };

  const contextValue = {
    token: token,
    isLoggedIn: token !== "",
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
