import { useUserPreferencesContext } from "../../common/contexts/UserPreferencesContext.js";

export default function useGetLoginFormMessages() {
  const { languageTag } = useUserPreferencesContext();
  const isPl = languageTag === "pl-PL";

  return {
    title: isPl ? "Zaloguj się" : "Sign in",
    username: {
      label: isPl ? "Nazwa użytkownika" : "Username",
      required: isPl
        ? "Nazwa użytkownika jest wymagana"
        : "Username is required",
    },
    password: {
      label: isPl ? "Hasło" : "Password",
      required: isPl ? "Hasło jest wymagane" : "Password is required",
    },
    register: {
      linkPrefix: isPl ? "Nie jesteś członkiem?" : "Are you not a member?",
      linkLabel: isPl ? "Zarejestruj się teraz" : "Register now",
    },
  };
}
