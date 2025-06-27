import { Grid } from "@mui/material";

import BookGridItem from "./BookGridItem";
import { BookshelfBookResponse } from "../../../common/models/bookshelfModels";

type BookGridProps = {
  books: BookshelfBookResponse[];
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
