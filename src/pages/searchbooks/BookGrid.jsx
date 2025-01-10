import css from "./search-books.module.css";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi2";

export default function BookGrid({ books }) {
  const navigate = useNavigate();
  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };
  return (
    <div className={css["book-grid"]}>
      {books.map((book) => (
        <div
          key={book.id}
          className={css["book-card"]}
          onClick={() => handleBookClick(book.id)}
        >
          <div className={css["book-cover"]}>
            <img src={book.coverUrl} alt={book.title} />
          </div>
          <div className={css["book-info"]}>
            <h3 className={css["book-title"]}>{book.title}</h3>
            <p className={css["book-authors"]}>{book.authors.join(", ")}</p>
            <div className={css["book-rating"]}>
              <FaStar className={css["star-icon"]} />
              <span>{book.ratingAverage}</span>
              <span className={css["rating-total"]}>{book.ratingTotal}</span>
            </div>
            <div className={css["book-details"]}>
              <span className={css["book-year"]}>{book.publishYear}</span>
              <span className={css["book-pages"]}>
                <HiOutlineBookOpen className={css["book-pages-icon"]} />
                {book.numberOfPages}
              </span>
            </div>
            <div className={css["book-genres"]}>
              {book.genres.map((genre) => (
                <span key={genre} className={css["genre-tag"]}>
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
