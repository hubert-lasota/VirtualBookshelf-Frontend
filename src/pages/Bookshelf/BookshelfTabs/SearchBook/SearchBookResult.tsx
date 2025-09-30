import { BookResponse } from "../../../../common/models/bookModels";
import { Stack } from "@mui/material";
import BookResultItem from "./BookResultItem";
import { BookContext } from "./BookContext";

type SearchBookResultProps = {
  books: BookResponse[];
};

export default function SearchBookResult({ books }: SearchBookResultProps) {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {books.map((b) => (
        <BookContext.Provider value={b}>
          <BookResultItem />
        </BookContext.Provider>
      ))}
    </Stack>
  );
}
