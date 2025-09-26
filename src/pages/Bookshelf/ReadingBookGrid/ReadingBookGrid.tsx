import { Grid } from "@mui/material";
import ReadingBookCard from "./ReadingBookCard/ReadingBookCard";
import { useBookshelfPageContext } from "../BookshelfPageContext";

export default function ReadingBookGrid() {
  const { readingBooks } = useBookshelfPageContext();
  return (
    <Grid container spacing={5} sx={{ paddingBottom: "1rem" }}>
      {readingBooks.map((rb) => (
        <Grid>
          <ReadingBookCard readingBook={rb} key={rb.id} />
        </Grid>
      ))}
    </Grid>
  );
}
