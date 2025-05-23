import css from "./loading.module.css";
import useMessageResolver from "../../features/message/useMessageResolver.js";

export default function LoadingPage() {
  const message = useMessageResolver();

  return (
    <div className={css["page"]}>
      <div className={css["book"]}>
        <div className={css["book-cover"]}>
          <div className={css["book-spine"]}></div>
        </div>
        <div className={css["book-page"]}></div>
      </div>
      <h2 className={css["loading-text"]}>{message("LoadingPage")}</h2>
    </div>
  );
}
