import { z } from "zod";
import { LoginFormMessages } from "../../pages/login/useGetLoginFormMessages";

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
