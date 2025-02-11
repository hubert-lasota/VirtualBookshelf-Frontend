import { useEffect, useRef, useState } from "react";
import useSearchBooks from "../../features/book/useSearchBooks";
import { FaSearch } from "react-icons/fa";
import css from "./home.module.css";
import { useNavigate } from "react-router-dom";
import useMessageResolver from "../../features/message/useMessageResolver.js";
import { useDebounceValue } from "../../common/hooks.js";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query);
  const { books } = useSearchBooks(debouncedQuery);
  const inputContainerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const message = useMessageResolver("Home:Header:SearchInput");

  useEffect(() => {
    if (!inputContainerRef) return;
    const handleClickOutsideComponents = (e) => {
      if (!inputContainerRef.current.contains(e.target)) {
        setQuery("");
      }
    };

    document.addEventListener("click", handleClickOutsideComponents);
    return () => {
      document.removeEventListener("click", handleClickOutsideComponents);
    };
  }, [inputContainerRef]);

  const handleNavigateToBookPage = (id) => {
    navigate(`/book/${id}`);
  };

  const isResultVisible = query && books && books.length > 0;

  return (
    <div
      ref={inputContainerRef}
      className={css["search-input-container"]}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={inputRef}
        className={`${css["search-input"]} ${isResultVisible ? css["show"] : ""}`}
      >
        <FaSearch className={css["search-input-icon"]} />
        <input
          placeholder={message("input:placeholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={css["search-input-select"]}>Text</div>
      </div>

      {isResultVisible && (
        <div
          className={css["search-input__result"]}
          style={{
            top: (inputRef?.current.offsetHeight + 24 || 0) + "px",
          }}
        >
          {books?.map((book) => (
            <div
              key={book.id}
              className={css["book-row"]}
              onClick={() => handleNavigateToBookPage(book.id)}
            >
              <img src={book.coverUrl} alt="cover" />
              <div>
                <div className={css["book-row__title"]}>{book.title}</div>
                <div className={css["book-row__authors"]}>
                  {book?.authors?.map((author) => author.fullName).join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
