import { Stack } from "@mui/material";
import BookDetailsCard from "./BookDetailsCard/BookDetailsCard";
import { useParams } from "react-router-dom";
import { useGetBookById } from "../../common/api/clients/bookClient";
import { VIEW_SPACING } from "../LoggedInViewContainer/config";
import BookReviews from "./BookDetailsCard/BookReviews";

export default function BookView() {
  const { id } = useParams();

  const { data: book, isLoading } = useGetBookById(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack
      spacing={4}
      sx={(theme) => ({ padding: theme.spacing(VIEW_SPACING) })}
    >
      <BookDetailsCard book={book!} />
      <BookReviews book={book!} />
    </Stack>
  );
}
