import { Grid } from "@mui/material";
import BookGridItem from "./BookGridItem";
import { useBookshelfViewContext } from "./BookshelfViewContext";

export default function BookGrid() {
  const { readingBooks } = useBookshelfViewContext();
  return (
    <Grid container spacing={5} sx={{ paddingBottom: "1rem" }}>
      {readingBooks.map((rb) => (
        <BookGridItem readingBook={rb} key={rb.id} />
      ))}
    </Grid>
  );
}
