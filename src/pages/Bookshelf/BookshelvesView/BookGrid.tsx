import { Grid } from "@mui/material";
import BookGridItem from "./BookGridItem";
import { useBookshelvesViewContext } from "./BookshelvesViewContext";

export default function BookGrid() {
  const { bookshelfBooks } = useBookshelvesViewContext();
  return (
    <Grid container spacing={5} sx={{ paddingBottom: "1rem" }}>
      {bookshelfBooks.map((bookshelfBook) => (
        <BookGridItem bookshelfBook={bookshelfBook} key={bookshelfBook.id} />
      ))}
    </Grid>
  );
}
