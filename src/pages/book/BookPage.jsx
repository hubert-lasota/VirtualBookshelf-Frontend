import { useParams } from "react-router-dom";
import useGetBookById from "../../features/book/useGetBookById.js";
import css from "./book.module.css";
import BookHeader from "./BookHeader.jsx";
import BookDetails from "./BookDetails.jsx";
import BookTags from "./BookTags.jsx";
import BookRatings from "./BookRatings.jsx";
import NotFound from "../notfound/NotFound.jsx";
import LoadingPage from "../loading/LoadingPage.jsx";

export default function BookPage() {
  const { id } = useParams();
  const { book, isLoading } = useGetBookById(id);

  if (isLoading && !book) {
    return <LoadingPage />;
  }

  if (!book) {
    return <NotFound />;
  }

  return (
    <div className={css["page"]}>
      <BookHeader book={book} />
      <BookDetails book={book} />
      <BookTags tags={book.tags} />
      <BookRatings book={book} />
    </div>
  );
}
