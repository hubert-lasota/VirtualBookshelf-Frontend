import { Stack } from "@mui/material";
import BookshelfContentHeader from "./BookshelfContentHeader";
import BookGrid from "./BookGrid";
import { BookshelfBookWithBookshelfHeader } from "../../../common/models/bookshelfBookModels";

type BookshelfContentProps = {
  books: BookshelfBookWithBookshelfHeader[];
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
