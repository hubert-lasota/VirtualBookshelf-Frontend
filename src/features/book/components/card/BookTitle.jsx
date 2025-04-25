import { useBookContext } from "./BookContext.js";
import css from "./book.module.css";

export default function BookTitle() {
  const { title } = useBookContext();

  return <h3 className={css["title"]}>{title}</h3>;
}
