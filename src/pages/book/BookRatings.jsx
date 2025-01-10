import css from "./book.module.css";

export default function BookRatings({ book }) {
  const ratings = book.ratingPage.content;
  return (
    <section className={css["section"]}>
      <h2 className={css["book-ratings-header"]}>Recenzje czytelników</h2>
      <div className={css["rating-list"]}>
        {ratings.map((rating) => (
          <div key={rating.id} className={css["rating-row"]}>
            <div className={css["rating-header"]}>
              <div className={css["rating-user-info"]}>
                <h3>{rating.user.username}</h3>
                <p className={css["rating-date"]}>
                  {new Date(rating.createdAtTimestamp).toLocaleDateString()}
                </p>
              </div>
              <div>{"Star rating"}</div>
            </div>
            <p className={css["rating-justification"]}>
              {rating.justification}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
