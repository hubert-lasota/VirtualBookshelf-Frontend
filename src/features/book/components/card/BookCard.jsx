import BookTitle from "./BookTitle.jsx";
import css from "./book.module.css";
import { BookContext } from "./BookContext.js";
import BookCover from "./BookCover.jsx";
import BookAuthors from "./BookAuthors.jsx";
import BookReadingProgress from "./BookReadingProgress.jsx";
import BookRating from "./BookRating.jsx";
import BookPublishYear from "./BookPublishYear.jsx";
import BookPages from "./BookPages.jsx";
import BookGenres from "./BookGenres.jsx";
import BookshelvesName from "./BookshelvesName.jsx";

export default function BookCard({
  book,
  children,
  direction = "column",
  className = "",
  ...rest
}) {
  return (
    <BookContext.Provider value={book}>
      <div
        className={`${css["book"]} ${direction === "column" ? css["column"] : ""} ${className}`}
        {...rest}
      >
        {children}
      </div>
    </BookContext.Provider>
  );
}

BookCard.Cover = BookCover;
BookCard.Title = BookTitle;
BookCard.Authors = BookAuthors;
BookCard.ReadingProgress = BookReadingProgress;
BookCard.Rating = BookRating;
BookCard.PublishYear = BookPublishYear;
BookCard.Pages = BookPages;
BookCard.Genres = BookGenres;
BookCard.BookshelvesName = BookshelvesName;
