import { createContext, useContext } from "react";

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
  iisAuthenticated: false,
});

export const AuthContextProvider = AuthContext.Provider;
export const useAuth = () => {
  return useContext(AuthContext);
};
