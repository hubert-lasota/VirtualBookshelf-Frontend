import css from "./book.module.css";
import Rating from "../../components/rating/Rating.jsx";

export default function BookRatings({ book }) {
  const ratings = book.ratingPage.content;
  return (
    <section className={css["section"]}>
      <h2 className={css["book-ratings-header"]}>Recenzje czytelników</h2>
      <div className={css["rating-list"]}>
        {ratings.map((rating) => (
          <Rating key={rating.id} rating={rating} />
        ))}
      </div>
    </section>
  );
}
