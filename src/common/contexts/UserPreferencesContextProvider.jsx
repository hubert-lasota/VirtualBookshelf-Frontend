import { useState } from "react";
import { UserPreferencesContext } from "./UserPreferencesContext.js";

export default function UserPreferencesContextProvider({ children }) {
  const [languageTag, setLanguageTag] = useState("pl-PL");

  return (
    <UserPreferencesContext.Provider value={{ languageTag, setLanguageTag }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
