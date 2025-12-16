import { createContext, useContext } from "react";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = AuthContext.Provider;

export const useAuth = () => useContext(AuthContext);
