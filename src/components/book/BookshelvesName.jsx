import { useBookContext } from "./BookContext.js";
import css from "./book.module.css";

export default function BookshelvesName() {
  const { bookshelves } = useBookContext();

  return (
    <div className={css["bookshelf-name-container"]}>
      {bookshelves.map((bookshelf) => (
        <span key={bookshelf.id} className={css["bookshelf-name"]}>
          {bookshelf.name}
        </span>
      ))}
    </div>
  );
}
