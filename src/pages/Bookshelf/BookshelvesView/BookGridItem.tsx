import BookCard from "../../../common/components/Book/Card/BookCard";
import { Box, Chip, Grid, Stack } from "@mui/material";
import ReadingBookMenuButton from "./ReadingBookMenu/ReadingBookMenuButton";
import { useState } from "react";
import { ReadingBookResponse } from "../../../common/models/readingBookModels";
import BookReadingProgress from "./BookReadingProgress";

type BookGridItemProps = {
  readingBook: ReadingBookResponse;
};

export default function BookGridItem({ readingBook }: BookGridItemProps) {
  const [isPointingCard, setIsPointingCard] = useState(true);

  return (
    <Grid
      onMouseEnter={() => setIsPointingCard(true)}
      onMouseLeave={() => setIsPointingCard(false)}
    >
      <BookCard
        book={readingBook.book}
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
              label={readingBook.bookshelf.name}
              color="primary"
              sx={{ height: "30px" }}
            />

            <ReadingBookMenuButton
              readingBook={readingBook}
              onClose={() => setIsPointingCard(false)}
            />
          </Stack>
          <BookReadingProgress
            progressPercentage={readingBook.progressPercentage}
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
