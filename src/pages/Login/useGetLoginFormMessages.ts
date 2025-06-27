import { useUserContext } from "../../common/auth/UserContext";

export type LoginFormMessages = {
  title: string;
  username: {
    label: string;
    min: string;
  };
  password: {
    label: string;
    min: string;
  };
  register: {
    linkPrefix: string;
    linkLabel: string;
  };
};

export default function useGetLoginFormMessages(): LoginFormMessages {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return {
    title: isPlLanguage ? "Zaloguj się" : "Sign in",
    username: {
      label: isPlLanguage ? "Nazwa użytkownika" : "Username",
      min: isPlLanguage
        ? "Nazwa użytkownika musi mieć minimum 4 znaki"
        : "Username must be at least 4 characters long",
    },
    password: {
      label: isPlLanguage ? "Hasło" : "Password",
      min: isPlLanguage
        ? "Hasło musi mieć minimum 4 znaki"
        : "Password must be at least 4 characters long",
    },
    register: {
      linkPrefix: isPlLanguage
        ? "Nie jesteś członkiem?"
        : "Are you not a member?",
      linkLabel: isPlLanguage ? "Zarejestruj się teraz" : "Register now",
    },
  };
}
