import { FaStar } from "react-icons/fa";
import { useBookContext } from "./BookContext.js";
import css from "./book.module.css";

export default function BookRating() {
  const { ratingAverage, ratingPage } = useBookContext();

  return (
    <div className={css["rating"]}>
      <FaStar className={css["rating-icon"]} />
      <span>{ratingAverage}</span>
      <span className={css["rating-total"]}>{ratingPage.total}</span>
    </div>
  );
}
