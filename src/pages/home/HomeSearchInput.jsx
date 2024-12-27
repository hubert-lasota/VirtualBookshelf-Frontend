import { useEffect, useRef, useState } from "react";
import useSearchBooks from "../../features/book/useSearchBooks";
import { FaSearch } from "react-icons/fa";
import css from "./home.module.css";

export default function HomeSearchInput() {
  const [query, setQuery] = useState("");
  const { books, search } = useSearchBooks();
  const inputContainerRef = useRef(null);
  const inputResultRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputContainerRef || !inputResultRef) return;
    const handleClickOutsideComponents = e => {
      e.stopPropagation();
      const target = e.target;
      const inputEl = inputRef.current;
      const resultEl = inputContainerRef.current;
      if(!(inputEl.contains(target) || resultEl.contains(target))) {
        setQuery("");
      }
    }

    document.addEventListener("click", handleClickOutsideComponents);
    return () => {
      document.removeEventListener("click", handleClickOutsideComponents);
    }
  }, [inputResultRef, inputContainerRef]);

  useEffect(() => {
    if (!inputContainerRef || !inputResultRef) return;
    const { offsetHeight } = inputContainerRef.current;

    inputResultRef.current.style.top = offsetHeight + 10 + "px";
  }, [inputResultRef, inputContainerRef]);

  useEffect(() => {
    if (!inputResultRef || !inputContainerRef) return;
    const resultClassList = inputResultRef.current.classList;
    const inputClassList = inputRef.current.classList;

    if (!query || !books) {
      resultClassList.remove(css["show"]);
      inputClassList.remove(css["show"]);
      return;
    }

    inputClassList.add(css["show"]);
    if(books.length > 0) resultClassList.add(css["show"]);
  }, [books, query, inputContainerRef, inputResultRef]);

  const handleInputChange = (value) => {
    setQuery(value);
    search(value, 0, 5);
  };

  return (
    <div ref={inputContainerRef} className={css["search-input-container"]}>
      <div ref={inputRef} className={css["search-input"]}>
        <input
          placeholder="Szukaj..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <FaSearch />
      </div>

      <div ref={inputResultRef} className={css["search-input__result"]}>
        {books?.map((book) => (
          <div key={book.id} className={css["book-row"]}>
            <img src={book.coverUrl} alt="cover" />
            <div>
              <div className={css["book-row__title"]}>{book.title}</div>
              <div className={css["book-row__authors"]}>{book.authors?.join(", ")}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
