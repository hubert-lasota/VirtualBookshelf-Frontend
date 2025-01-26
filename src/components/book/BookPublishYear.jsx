import { useBookContext } from "./BookContext.js";
import css from "./book.module.css";

export default function BookPublishYear() {
  const { publishYear } = useBookContext();

  return <span className={css["publish-year"]}>{publishYear}</span>;
}
