import { useBookContext } from "./BookContext.js";
import css from "./book.module.css";

export default function BookGenres() {
  const { genres } = useBookContext();

  return (
    <div className={css["genres"]}>
      {genres.map((genre) => (
        <span key={genre} className={css["genre-tag"]}>
          {genre}
        </span>
      ))}
    </div>
  );
}
