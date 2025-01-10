import { useParams } from "react-router-dom";
import useGetBookById from "../../features/book/useGetBookById.js";
import Loading from "../../components/loading/Loading.jsx";
import css from "./book.module.css";
import BookHeader from "./BookHeader.jsx";
import BookDetails from "./BookDetails.jsx";
import BookTags from "./BookTags.jsx";
import BookRatings from "./BookRatings.jsx";

export default function BookPage() {
  const { id } = useParams();
  const { book, isLoading } = useGetBookById(id);

  if (isLoading) {
    return <Loading variant="page" />;
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
