import { ReactNode } from "react";
import { UserContext } from "./UserContext";
import { useLocalStorage } from "../hooks";
import {
  AppLanguageCode,
  UserPreferences,
  UserResponse,
} from "../models/userModels";
import { PaletteMode } from "@mui/material";

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<UserResponse>("user");
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    "preferences",
    {
      initialValue: {
        languageCode: "pl".includes(navigator.language) ? "pl" : "en",
        themeMode: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      },
    },
  );

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        preferences: {
          ...preferences,
          isDarkTheme: preferences.themeMode === "dark",
          isPlLanguage: preferences.languageCode === "pl",
          setLanguageCode: (languageCode: AppLanguageCode) =>
            setPreferences({ ...preferences, languageCode }),
          setThemeMode: (themeMode: PaletteMode) =>
            setPreferences({ ...preferences, themeMode }),
        },
        setPreferences,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
