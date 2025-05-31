import { PaletteMode } from "@mui/material";

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl: string;
};

export type User = {
  id: number;
  username: string;
  jwt: string;
  profile: UserProfile;
};

export type LanguageTag = "pl-PL" | "en-US";

export type UserPreferences = {
  languageTag: LanguageTag;
  themeMode: PaletteMode;
};
