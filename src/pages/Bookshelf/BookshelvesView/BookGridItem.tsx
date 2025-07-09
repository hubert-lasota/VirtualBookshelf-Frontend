import BookCard from "../../../common/components/Book/Card/BookCard";
import { Box, Chip, Grid, Stack } from "@mui/material";
import BookshelfBookMenuButton from "./BookMenu/BookshelfBookMenuButton";
import { useState } from "react";
import { BookshelfBookResponse } from "../../../common/models/bookshelfBookModels";
import BookReadingProgress from "./BookReadingProgress";

type BookGridItemProps = {
  bookshelfBook: BookshelfBookResponse;
};

export default function BookGridItem({ bookshelfBook }: BookGridItemProps) {
  const [isPointingCard, setIsPointingCard] = useState(true);

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
              label={bookshelfBook.bookshelf.name}
              color="primary"
              sx={{ height: "30px" }}
            />

            <BookshelfBookMenuButton
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
