import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ReadingBookResponse } from "../../../../common/models/readingBookModels";
import { ReadingBookContext } from "./ReadingBookContext";
import ReadingBookCover from "./ReadingBookCover";

type ReadingBookCardProps = {
  readingBook: ReadingBookResponse;
};

export default function ReadingBookCard({ readingBook }: ReadingBookCardProps) {
  const [isPointingCard, setIsPointingCard] = useState(true);

  return (
    <ReadingBookContext.Provider value={readingBook}>
      <Stack
        sx={{ minWidth: "150px" }}
        component={Paper}
        elevation={isPointingCard ? 6 : undefined}
        onMouseEnter={() => setIsPointingCard(true)}
        onMouseLeave={() => setIsPointingCard(false)}
      >
        <ReadingBookCover onPointingCardChange={setIsPointingCard} />
        <Stack sx={(theme) => ({ padding: theme.spacing(2) })}>
          <Typography fontWeight={600} variant="h6">
            {readingBook.book.title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {readingBook.book.authors.map((a) => a.fullName).join(", ")}
          </Typography>
        </Stack>
      </Stack>
    </ReadingBookContext.Provider>
  );
}
