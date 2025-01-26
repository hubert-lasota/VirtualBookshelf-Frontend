import { useState } from "react";
import EmptyBookshelf from "./EmptyBookshelf.jsx";
import css from "./bookshelf.module.css";
import Header from "./Header.jsx";
import Navbar from "./Navbar.jsx";
import BookGrid from "./BookGrid.jsx";

export default function BookshelfPage() {
  const [currentBookshelf, setCurrentBookshelf] = useState("all");
  const [clickedBook, setClickedBook] = useState(null);
  const { bookshelves } = {};

  const renderMain = () => {
    if (currentBookshelf === "all") {
      let totalBooks = 0;
      bookshelves.forEach((shelf) => (totalBooks += shelf.books.length));
      if (totalBooks === 0) return <EmptyBookshelf />;
    }
    if (currentBookshelf.books.length === 0) {
      return <EmptyBookshelf />;
    }
    const books =
      currentBookshelf === "all"
        ? bookshelves.map((bookshelf) => bookshelf.books)
        : currentBookshelf.books;

    return (
      <>
        <h3 style={{ marginInline: "0.7rem" }}>
          {currentBookshelf === "all"
            ? "Wszystkie książki"
            : currentBookshelf.name}
          `
        </h3>
        <BookGrid books={books} onClickBook={setClickedBook} />
      </>
    );
  };

  return (
    <div className={css["page"]}>
      <Header />
      <Navbar
        bookshelves={bookshelves}
        currentBookshelf={currentBookshelf}
        onClickBookshelfTab={setCurrentBookshelf}
      />
      <main className={css["main"]}>{renderMain()}</main>
    </div>
  );
}
