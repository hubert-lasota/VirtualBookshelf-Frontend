import { BsSliders2Vertical } from "react-icons/bs";
import { ImSortAmountAsc, ImSortAmountDesc } from "react-icons/im";
import css from "./search-books.module.css";

export default function FilterPanel({
  filter: { minRating, genres, sortBy, sortOrder },
  availableGenres,
  updateFilter,
}) {
  // TODO this component should fetch availableGenres from API
  const sortOptions = [
    { value: "rating", message: "Ocena" },
    { value: "year", message: "Rok wydania" },
    { value: "title", message: "Tytuł" },
    { value: null, message: "Brak" },
  ];

  const changeGenre = (e, genre) => {
    const newGenres = e.target.value
      ? [...genres, genre]
      : genres.filter((g) => g !== genre);
    updateFilter({ genres: newGenres });
  };

  return (
    <div className={css["filter-container"]}>
      <header className={css["filter-header"]}>
        <BsSliders2Vertical />
        <h2>Filtry</h2>
      </header>
      <section className={css["filter-section"]}>
        <h3>Kategorie</h3>
        <div className={css["genres-list"]}>
          {availableGenres.map((genre) => (
            <label key={genre} className={css["genre-checkbox"]}>
              <input
                type="checkbox"
                checked={genres.includes(genre)}
                onChange={(e) => changeGenre(e, genre)}
              />
              <span>{genre}</span>
            </label>
          ))}
        </div>
      </section>
      <section className={css["filter-section"]}>
        <h3>Minimalna ocena</h3>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={minRating}
          onChange={(e) => updateFilter({ minRating: Number(e.target.value) })}
          className={css["rating-slider"]}
        />
        <span>{minRating} ⭐</span>
      </section>
      <section className={css["filter-section"]}>
        <h3>Sortowanie</h3>
        <div className={css["sort-options"]}>
          <select
            value={sortBy}
            className={css["sort-select"]}
            onChange={(e) => updateFilter({ sortBy: e.target.value })}
          >
            {sortOptions.map((option) => (
              <option value={option.value} key={option}>
                {option.message}
              </option>
            ))}
          </select>
          <button
            onClick={() =>
              updateFilter({ sortOrder: sortOrder === "asc" ? "desc" : "asc" })
            }
            className={css["sort-order-btn"]}
          >
            {sortOrder === "asc" ? <ImSortAmountAsc /> : <ImSortAmountDesc />}
          </button>
        </div>
      </section>
    </div>
  );
}
