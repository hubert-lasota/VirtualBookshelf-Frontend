import css from "./book.module.css";

export default function BookHeader({ book }) {
  return (
    <section className={`${css["book"]} ${css["section"]}`}>
      <div className={css["book-cover"]}>
        <img src={book.coverUrl} alt={book.title} />
      </div>
      <div className={css["book-info"]}>
        <h1 className={css["book-title"]}>{book.title}</h1>
        <p className={css["book-authors"]}>
          {book?.authors?.map((author) => author.fullName).join(", ")}
        </p>
      </div>
      <div className={css["review-container"]}>
        {"Ikona gwiazdki"}
        <span>{`${book.averageRating} / 5.0 (${book.ratingPage.total})`}</span>
      </div>
      <div className={css["book-stats"]}>
        <div className={css["stat-item"]}>
          {"Ikona zegara?"}
          <span>{`${book.publishYear} rok`}</span>
        </div>
        <div className={css["stat-item"]}>
          {"Book open ikona"}
          <span>{`${book.numberOfPages} stron`}</span>
        </div>
        <p className={css["book-description"]}>{book.description}</p>
      </div>
    </section>
  );
}
