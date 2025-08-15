import BookDetailsCard from "./BookDetailsCard/BookDetailsCard";
import { useParams } from "react-router-dom";
import { useGetBookById } from "../../common/api/clients/bookClient";
import BookReviews from "./BookDetailsCard/BookReviews";
import { BookDetailsContext } from "./BookDetailsContext";
import ViewContainer from "../../common/components/ui/View/ViewContainer";

export default function BookView() {
  const { id } = useParams();

  const { data: book, isLoading } = useGetBookById(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BookDetailsContext.Provider value={book!}>
      <ViewContainer spacing={4}>
        <BookDetailsCard />
        <BookReviews />
      </ViewContainer>
    </BookDetailsContext.Provider>
  );
}
