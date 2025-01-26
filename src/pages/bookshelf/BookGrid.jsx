import BookCard from "../../components/book/BookCard.jsx";
import css from "./bookshelf.module.css";

export default function BookGrid({ books, onClickBook }) {
  return (
    <div className={css["grid"]}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={onClickBook}>
          <BookCard.Cover />
          <BookCard.Title />
          <div style={{ marginTop: "1rem" }}>
            <BookCard.Rating />
            <BookCard.BookshelvesName />
          </div>
        </BookCard>
      ))}
    </div>
  );
}
