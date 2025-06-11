import css from "./loading.module.css";
import { useUserContext } from "../../../features/user/UserContext";

export default function LoadingPage() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <div className={css["page"]}>
      <div className={css["book"]}>
        <div className={css["Book-cover"]}>
          <div className={css["Book-spine"]}></div>
        </div>
        <div className={css["Book-page"]}></div>
      </div>
      <h2 className={css["Loading-text"]}>
        {isPlLanguage ? "Ładowanie..." : "Loading..."}
      </h2>
    </div>
  );
}
