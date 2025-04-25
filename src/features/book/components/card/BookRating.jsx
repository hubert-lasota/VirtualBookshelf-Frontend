import { FaStar } from "react-icons/fa";
import { useBookContext } from "./BookContext.js";
import css from "./book.module.css";

export default function BookRating() {
  const { ratingAverage, ratingPage } = useBookContext();

  return (
    <div className={css["review"]}>
      <FaStar className={css["review-icon"]} />
      <span>{ratingAverage}</span>
      <span className={css["review-total"]}>{ratingPage.total}</span>
    </div>
  );
}
