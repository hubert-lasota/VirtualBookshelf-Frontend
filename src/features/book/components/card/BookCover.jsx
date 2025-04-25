import { useBookContext } from "./BookContext.js";
import css from "./book.module.css";

export default function BookCover() {
  const { coverUrl, title } = useBookContext();

  return (
    <div className={css["cover"]}>
      <img src={coverUrl} alt={title} />
    </div>
  );
}
