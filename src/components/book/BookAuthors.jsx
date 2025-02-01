import { useBookContext } from "./BookContext.js";
import css from "../../pages/searchbooks/search-books.module.css";

export default function BookAuthors() {
  const { authors } = useBookContext();
  return (
    <span className={css["authors"]}>
      {authors.map((author) => author.fullName).join(", ")}
    </span>
  );
}
