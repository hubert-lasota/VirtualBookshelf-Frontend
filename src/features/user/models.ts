import { PaletteMode } from "@mui/material";
import { z } from "zod";
import { LoginFormMessages } from "../../pages/login/useGetLoginFormMessages";

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

type createUserCredentialsSchemaParams = Pick<
  LoginFormMessages,
  "username" | "password"
>;

export const createUserCredentialsSchema = ({
  username,
  password,
}: createUserCredentialsSchemaParams) =>
  z.object({
    username: z.string().min(4, username.min),
    password: z.string().min(4, password.min),
  });

export type UserCredentials = z.infer<
  ReturnType<typeof createUserCredentialsSchema>
>;
