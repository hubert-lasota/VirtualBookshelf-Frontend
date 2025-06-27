import { Grid } from "@mui/material";

import { BookshelfBookWithBookshelfHeader } from "../../../common/models/bookshelfBookModels";
import BookGridItem from "./BookGridItem";

type BookGridProps = {
  books: BookshelfBookWithBookshelfHeader[];
};

export default function BookGrid({ books }: BookGridProps) {
  return (
    <Grid container spacing={2}>
      {books.map((bookshelfBook) => (
        <BookGridItem bookshelfBook={bookshelfBook} key={bookshelfBook.id} />
      ))}
    </Grid>
  );
}
