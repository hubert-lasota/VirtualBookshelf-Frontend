import { Box, Grid, Stack } from "@mui/material";
import BookCard from "../../features/book/components/Card/BookCard";
import BookMenuButton from "./BookMenu/BookMenuButton";
import { BookshelfBookWithId } from "../../features/bookshelf/bookshelfBookModels";

type BookGridProps = {
  books: BookshelfBookWithId[];
};

export default function BookGrid({ books }: BookGridProps) {
  return (
    <Grid container>
      {books.map((bookshelfBook) => (
        <Grid key={`book-grid-item-${bookshelfBook.id}`}>
          <BookCard book={bookshelfBook.book} sx={{ minWidth: "150px" }}>
            <Box sx={{ height: "150px", width: "100%", position: "relative" }}>
              <Stack
                direction="row"
                sx={{ backgroundColor: "transparent" }}
              ></Stack>
              <BookCard.Cover
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "fill",
                }}
              />
            </Box>
            <BookCard.Title />
            <BookCard.Authors />
            <BookMenuButton bookshelfBook={bookshelfBook} />
          </BookCard>
        </Grid>
      ))}
    </Grid>
  );
}
