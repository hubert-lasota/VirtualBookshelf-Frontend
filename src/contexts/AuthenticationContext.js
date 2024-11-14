import { createContext, useContext } from "react";

export const AuthenticationContext = createContext(null);

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error("AuthenticationContext needs to be used inside AuthenticationContextProvider");
  }
  return context;
};

