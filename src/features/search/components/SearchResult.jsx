import css from "./search.module.css";
import { FaSearch } from "react-icons/fa";
import BookCard from "../../book/components/card/BookCard.jsx";
import useMessageResolver from "../../message/useMessageResolver.js";

export function SearchResult({ books, isLoading, query }) {
  const message = useMessageResolver("Home:Header:SearchModal:Result");

  const renderResult = () => {
    if (!query && books.length === 0) {
      return (
        <div
          className={`${css["result-container"]} ${css["start-searching-container"]}`}
        >
          <FaSearch />
          <span>{message("start-searching")}</span>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div
          className={`${css["result-container"]} ${css["loading-result-container"]}`}
        >
          Ładuję...
        </div>
      );
    }
    if (books.length === 0) {
      return (
        <div
          className={`${css["result-container"]} ${css["empty-result-container"]}`}
        >
          Nie znaleziono zadnej ksiazki
        </div>
      );
    }

    if (books.length > 0) {
      return (
        <div
          className={`${css["result-container"]} ${css["valid-result-container"]}`}
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book}>
              <div style={{ width: "10%", height: "10%" }}>
                <BookCard.Cover />
              </div>
              <div>
                <BookCard.Title />
                <BookCard.Authors />
              </div>
            </BookCard>
          ))}
        </div>
      );
    }
  };
  return renderResult();
}
