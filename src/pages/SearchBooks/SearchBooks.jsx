import css from "./search-books.module.css";
import SearchBar from "./SearchBar.jsx";
import FilterPanel from "./FilterPanel.jsx";
import BookGrid from "./BookGrid.jsx";

export default function SearchBooks() {
  return (
    <div className={css["page"]}>
      <header className={css["header"]}>
        <SearchBar />
      </header>
      <main className={css["main-content"]}>
        <aside className={css["sidebar"]}>
          <FilterPanel />
        </aside>
        <section className={css["results"]}>
          <h2 className={css["results-header"]}>Znaleziono książki (liczba)</h2>
          <BookGrid />
        </section>
      </main>
    </div>
  );
}
