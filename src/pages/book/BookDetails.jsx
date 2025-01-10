import css from "./book.module.css";

export default function BookDetails({ book }) {
  return (
    <section className={css["section"]}>
      <h2>Szczegóły</h2>
      <div className={css["details-grid"]}>
        <div className={css["detail-item"]}>
          <span className={css["detail-label"]}>Wydawnictwo:</span>
          <span className={css["detail-value"]}>{book.publisher}</span>
        </div>
        <div className={css["detail-item"]}>
          <span className={css["detail-label"]}>ISBN:</span>
          <span className={css["detail-value"]}>{book.isbn}</span>
        </div>
        <div className={css["detail-item"]}>
          <span className={css["detail-label"]}>Język:</span>
          <span className={css["detail-value"]}>{book.language}</span>
        </div>
        <div className={css["detail-item"]}>
          <span className={css["detail-label"]}>Liczba stron:</span>
          <span className={css["detail-value"]}>{book.numberOfPages}</span>
        </div>
      </div>
    </section>
  );
}
