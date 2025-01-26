import css from "./bookshelf.module.css";
import Button from "../../components/button/Button.jsx";

export default function Navbar({
  bookshelves,
  currentBookshelf,
  onClickBookshelfTab,
}) {
  return (
    <nav className={css["nav"]}>
      <Button
        onClick={() => onClickBookshelfTab("all")}
        className={`${css["nav-btn"]} ${currentBookshelf.name === "all" ? css["active"] : ""}`}
      >
        Wszystkie książki
      </Button>
      {bookshelves.map((bookshelf) => (
        <Button
          key={bookshelf.id}
          onClick={() => onClickBookshelfTab(bookshelf)}
          className={`${css["nav-btn"]} ${currentBookshelf.name === bookshelf.name ? css["active"] : ""}`}
        >
          {bookshelf.name}
        </Button>
      ))}
    </nav>
  );
}
