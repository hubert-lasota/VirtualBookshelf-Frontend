import css from "./loading.module.css";
import { useUserContext } from "../../../features/user/UserContext";

export default function LoadingPage() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <div className={css["page"]}>
      <div className={css["book"]}>
        <div className={css["book-cover"]}>
          <div className={css["book-spine"]}></div>
        </div>
        <div className={css["book-page"]}></div>
      </div>
      <h2 className={css["loading-text"]}>
        {isPlLanguage ? "Ładowanie..." : "Loading..."}
      </h2>
    </div>
  );
}
