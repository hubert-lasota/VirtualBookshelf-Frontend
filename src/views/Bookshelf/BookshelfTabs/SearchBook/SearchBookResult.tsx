import { BookResponse } from "../../../../common/models/bookModels";
import { Stack } from "@mui/material";
import BookResultItem from "./BookResultItem";

type SearchBookResultProps = {
  books: BookResponse[];
};
export default function SearchBookResult({ books }: SearchBookResultProps) {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {books.map((b) => (
        <BookResultItem book={b} />
      ))}
    </Stack>
  );
}
