import { LanguageTag, User, UserPreferences } from "./models";
import { createContext, useContext } from "react";
import { PaletteMode } from "@mui/material";

type UserContextValue = {
  user: User;
  setUser: (user: User) => void;
  preferences: UserPreferences & {
    isPlLanguage: boolean;
    isDarkTheme: boolean;
    setLanguageTag: (languageTag: LanguageTag) => void;
    setThemeMode: (themeMode: PaletteMode) => void;
  };
  setPreferences: (preferences: UserPreferences) => void;
};

export const UserContext = createContext<UserContextValue | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext must be used within UserProvider.");
  }
  return context;
};
