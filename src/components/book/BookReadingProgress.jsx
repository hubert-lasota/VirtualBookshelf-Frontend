import css from "./book.module.css";
import { useBookContext } from "./BookContext.js";

export default function BookReadingProgress() {
  const { readingDetails } = useBookContext();
  return (
    <div className={css["progress-container"]}>
      <div
        className={css["progress-fill"]}
        style={{ width: `${readingDetails.progressPercentage}%` }}
      ></div>
    </div>
  );
}
