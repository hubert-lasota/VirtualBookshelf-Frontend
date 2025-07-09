import { Grid } from "@mui/material";
import BookGridItem from "./BookGridItem";
import { useBookshelvesViewContext } from "./BookshelvesViewContext";

export default function BookGrid() {
  const { readingBooks } = useBookshelvesViewContext();
  return (
    <Grid container spacing={5} sx={{ paddingBottom: "1rem" }}>
      {readingBooks.map((rb) => (
        <BookGridItem readingBook={rb} key={rb.id} />
      ))}
    </Grid>
  );
}
