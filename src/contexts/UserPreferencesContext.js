import { createContext, useContext } from "react";

export const UserPreferencesContext = createContext(null);

export const useUserPreferencesContext = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error(
      "UsePreferencesContext must be used within the UserPreferencesContextProvider",
    );
  }
  return context;
};
