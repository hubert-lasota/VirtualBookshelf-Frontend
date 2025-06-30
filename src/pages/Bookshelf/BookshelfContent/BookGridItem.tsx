import BookCard from "../../../common/components/Book/Card/BookCard";
import { Box, Chip, Grid, Stack } from "@mui/material";
import BookMenuButton from "../BookMenu/BookMenuButton";
import { useState } from "react";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import { findBookshelf } from "../../../common/utils/bookshelfUtils";
import { BookshelfBookResponse } from "../../../common/models/bookshelfBookModels";
import BookReadingProgress from "./BookReadingProgress";

type BookGridItemProps = {
  bookshelfBook: BookshelfBookResponse;
};

export default function BookGridItem({ bookshelfBook }: BookGridItemProps) {
  const [isPointingCard, setIsPointingCard] = useState(true);

  const { bookshelves } = useBookshelfPageContext();

  const bookshelf = findBookshelf(bookshelves, bookshelfBook.id);

  return (
    <Grid
      onMouseEnter={() => setIsPointingCard(true)}
      onMouseLeave={() => setIsPointingCard(false)}
    >
      <BookCard
        book={bookshelfBook.book}
        sx={{ minWidth: "150px" }}
        elevation={isPointingCard ? 6 : undefined}
      >
        <Box sx={{ height: "300px", width: "200px", position: "relative" }}>
          <Stack
            direction="row"
            sx={{
              position: "absolute",
              top: 12,
              paddingInline: "16px",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Chip
              label={bookshelf.name}
              color="primary"
              sx={{ height: "30px" }}
            />

            <BookMenuButton
              bookshelfBook={bookshelfBook}
              onClose={() => setIsPointingCard(false)}
            />
          </Stack>
          <BookReadingProgress
            progressPercentage={bookshelfBook.progressPercentage}
          />
          <BookCard.Cover
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "fill",
            }}
          />
        </Box>
        <Stack sx={(theme) => ({ padding: theme.spacing(2) })}>
          <BookCard.Title />
          <BookCard.Authors />
        </Stack>
      </BookCard>
    </Grid>
  );
}
