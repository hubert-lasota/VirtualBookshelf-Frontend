import css from "./search-books.module.css";
import { CiSearch } from "react-icons/ci";

export default function SearchBar({ query, onQueryChange }) {
  return (
    <div className={css["search-bar"]}>
      <CiSearch className={css["search-icon"]} />
      <input
        value={query}
        onChange={onQueryChange}
        placeholder="Wyszukaj książki po tytule, autorze, ISBN..."
      />
      className={css["search-input"]}
    </div>
  );
}
