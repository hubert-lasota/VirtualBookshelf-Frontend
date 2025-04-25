import css from "./search-books.module.css";
import { useNavigate } from "react-router-dom";
import BookCard from "../../features/book/components/card/BookCard.jsx";

export default function BookGrid({ books }) {
  const navigate = useNavigate();

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className={css["book-grid"]}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={handleBookClick}>
          <BookCard.Cover />
          <div style={{ padding: "1rem" }}>
            <BookCard.Title />
            <BookCard.Authors />
            <BookCard.Rating />
          </div>
          <div>
            <BookCard.PublishYear />
            <BookCard.Pages />
          </div>
          <BookCard.Genres />
        </BookCard>
      ))}
    </div>
  );
}
