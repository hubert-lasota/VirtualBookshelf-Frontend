import { ReactNode } from "react";
import { UserContext } from "./UserContext";
import { useLocalStorage } from "../../common/hooks";
import { LanguageTag, User, UserPreferences } from "./models";
import { PaletteMode } from "@mui/material";

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User>("user");
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    "preferences",
    {
      initialValue: {
        languageTag: "pl".includes(navigator.language) ? "pl-PL" : "en-US",
        themeMode: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      },
    },
  );
  console.log("pref", preferences);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        preferences: {
          ...preferences,
          isDarkTheme: preferences.themeMode === "dark",
          isPlLanguage: preferences.languageTag === "pl-PL",
          setLanguageTag: (languageTag: LanguageTag) =>
            setPreferences({ ...preferences, languageTag }),
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
