import { Grid } from "@mui/material";
import ReadingBookCard from "./ReadingBookCard/ReadingBookCard";
import { useBookshelfPageContext } from "../BookshelfPageContext";

export default function ReadingBookGrid() {
  const { readingBooks } = useBookshelfPageContext();
  return (
    <Grid container spacing={5} sx={{ paddingBottom: "1rem" }}>
      {readingBooks.map((rb) => (
        <Grid size={{ md: 3, lg: 6, xs: 12, sm: 12 }}>
          <ReadingBookCard readingBook={rb} key={rb.id} />
        </Grid>
      ))}
    </Grid>
  );
}
