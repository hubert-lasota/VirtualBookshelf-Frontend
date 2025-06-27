import { Stack } from "@mui/material";
import BookshelfContentHeader from "./BookshelfContentHeader";
import BookGrid from "./BookGrid";
import { BookshelfBookResponse } from "../../../common/models/bookshelfModels";

type BookshelfContentProps = {
  books: BookshelfBookResponse[];
};

export default function BookshelfContent({ books }: BookshelfContentProps) {
  return (
    <Stack
      spacing={3}
      sx={(theme) => ({ width: "100%", padding: theme.spacing(3) })}
    >
      <BookshelfContentHeader />
      <BookGrid books={books} />
    </Stack>
  );
}
