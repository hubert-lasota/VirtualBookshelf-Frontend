import { PaletteMode } from "@mui/material";
import { z } from "zod";
import { LoginFormMessages } from "../../pages/Login/useGetLoginFormMessages";

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl: string;
};

export type UserSignInResponse = {
  id: number;
  username: string;
  jwt: string;
};

export type User = {
  id: number;
  username: string;
  profile: UserProfile;
};

export type AppLanguageCode = "pl" | "en";

export type UserPreferences = {
  languageCode: AppLanguageCode;
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
