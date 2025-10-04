import RecommendedResourceContainer from "./RecommendedResourceContainer";
import { useGetRecommendedBooks } from "../../common/api/clients/recommendationClient";
import BookCard from "../../common/components/Book/BookCard";
import { MAX_RESOURCES_IN_ROW, RESOURCE_IMG_SX } from "./config";
import { useUserContext } from "../../common/auth/UserContext";
import { useNavigate } from "react-router-dom";

export default function RecommendedBooksCard() {
  const { data: { books = [] } = {} } = useGetRecommendedBooks();
  const slicedBooks = books.slice(0, MAX_RESOURCES_IN_ROW);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const navigate = useNavigate();

  return (
    <RecommendedResourceContainer
      title={isPlLanguage ? "Rekomendowane książki" : "Recommended books"}
      onClickSeeMore={() => navigate("/recommended-books")}
    >
      {slicedBooks.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          bookCoverProps={{ sx: RESOURCE_IMG_SX }}
        />
      ))}
    </RecommendedResourceContainer>
  );
}
