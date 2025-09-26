import BookDetailsCard from "./BookDetailsCard/BookDetailsCard";
import { useParams } from "react-router-dom";
import { useGetBookById } from "../../common/api/clients/bookClient";
import BookReviews from "./BookDetailsCard/BookReviews";
import { BookDetailsContext } from "./BookDetailsContext";
import LoggedInPageContainer from "../LoggedInLayout/LoggedInPageContainer";

export default function BookPage() {
  const { id } = useParams();

  const { data: book, isLoading } = useGetBookById(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BookDetailsContext.Provider value={book!}>
      <LoggedInPageContainer spacing={4}>
        <BookDetailsCard />
        <BookReviews />
      </LoggedInPageContainer>
    </BookDetailsContext.Provider>
  );
}
