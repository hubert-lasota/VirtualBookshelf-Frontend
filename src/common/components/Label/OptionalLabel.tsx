import { useUserContext } from "../../../features/user/UserContext";

export default function OptionalLabel({ text }: { text: string }) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return <>{`${text} (${isPlLanguage ? "Opcjonalnie" : "Optional"})`}</>;
}
