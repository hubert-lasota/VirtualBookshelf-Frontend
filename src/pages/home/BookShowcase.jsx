import css from "./home.module.css";
import { useEffect, useState } from "react";

export default function BookShowcase({ books, intervalMs = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentBook = books[currentIndex];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % books.length);
      }, 500);
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [books.length, intervalMs]);

  return (
    <div className={css["book-showcase"]}>
      <div
        className={`${css["book-showcase-content"]} ${isTransitioning ? css["transitioning"] : ""}`}
      >
        <div className={css["book-showcase-cover"]}>
          <img src={currentBook.coverUrl} alt={currentBook.title} />
        </div>
        <div className={css["book-showcase-info"]}>
          <h2>{currentBook.title}</h2>
          <h3>{currentBook.authors.join(", ")}</h3>
          <p>{currentBook.description}</p>
        </div>
        <div className={css["book-showcase-indicators"]}>
          {books.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`${css["indicator"]} ${index === currentIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
