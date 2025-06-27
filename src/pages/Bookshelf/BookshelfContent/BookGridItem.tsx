import BookCard from "../../../common/components/Book/Card/BookCard";
import { Box, Chip, Grid, Stack } from "@mui/material";
import BookMenuButton from "../BookMenu/BookMenuButton";
import { BookshelfBookWithBookshelfHeader } from "../../../common/models/bookshelfBookModels";
import { useState } from "react";

type BookGridItemProps = {
  bookshelfBook: BookshelfBookWithBookshelfHeader;
};

export default function BookGridItem({ bookshelfBook }: BookGridItemProps) {
  const [showMenuButton, setShowMenuButton] = useState(false);

  return (
    <Grid
      onMouseEnter={() => setShowMenuButton(true)}
      onMouseLeave={() => setShowMenuButton(false)}
    >
      <BookCard book={bookshelfBook.book} sx={{ minWidth: "150px" }}>
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
            {showMenuButton && <BookMenuButton bookshelfBook={bookshelfBook} />}
          </Stack>
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
