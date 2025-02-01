import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext needs to be used within AuthContextProvider");
  }
  return context;
};
