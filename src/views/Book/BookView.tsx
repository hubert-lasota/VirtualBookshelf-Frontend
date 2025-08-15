import { Stack } from "@mui/material";
import BookDetailsCard from "./BookDetailsCard/BookDetailsCard";
import { useParams } from "react-router-dom";
import { useGetBookById } from "../../common/api/clients/bookClient";
import { VIEW_SPACING } from "../LoggedInViewContainer/config";
import BookReviews from "./BookDetailsCard/BookReviews";
import { BookDetailsContext } from "./BookDetailsContext";

export default function BookView() {
  const { id } = useParams();

  const { data: book, isLoading } = useGetBookById(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BookDetailsContext.Provider value={book!}>
      <Stack
        spacing={4}
        sx={(theme) => ({ padding: theme.spacing(VIEW_SPACING) })}
      >
        <BookDetailsCard />
        <BookReviews />
      </Stack>
    </BookDetailsContext.Provider>
  );
}
