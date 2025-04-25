import { HiOutlineBookOpen } from "react-icons/hi2";
import { useBookContext } from "./BookContext.js";
import css from "./book.module.css";

export default function BookPages() {
  const { numberOfPages } = useBookContext();

  return (
    <span className={css["book-pages"]}>
      <HiOutlineBookOpen className={css["book-pages-icon"]} />
      {numberOfPages}
    </span>
  );
}
