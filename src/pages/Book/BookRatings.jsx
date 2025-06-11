import css from "./book.module.css";
import Review from "../../features/review/components/Review.jsx";

export default function BookRatings({ book }) {
  const ratings = book.ratingPage.content;
  return (
    <section className={css["section"]}>
      <h2 className={css["Book-ratings-header"]}>Recenzje czytelników</h2>
      <div className={css["review-list"]}>
        {ratings.map((rating) => (
          <Review key={rating.id} rating={rating} />
        ))}
      </div>
    </section>
  );
}
