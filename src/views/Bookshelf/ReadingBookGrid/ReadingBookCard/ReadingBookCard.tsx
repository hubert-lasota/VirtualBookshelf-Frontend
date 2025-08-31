import { Paper, Stack, Typography } from "@mui/material";
import { ReadingBookResponse } from "../../../../common/models/readingBookModels";
import { ReadingBookContext } from "./ReadingBookContext";
import BookCover from "../../../../common/components/Book/BookCover";
import ReadingProgress from "./ReadingProgress";
import ReadingBookStats from "./ReadingBookStats";
import TitleAndActionsButton from "./TitleAndActionsButton";
import ChipStack from "./ChipStack";

type ReadingBookCardProps = {
  readingBook: ReadingBookResponse;
};

export default function ReadingBookCard({ readingBook }: ReadingBookCardProps) {
  return (
    <ReadingBookContext.Provider value={readingBook}>
      <Stack
        direction="row"
        sx={(theme) => ({
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[2],
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: theme.shadows[6],
          },
        })}
        component={Paper}
        spacing={2}
        variant="outlined"
      >
        <BookCover
          coverUrl={readingBook.book.coverUrl}
          sx={{
            height: "300px",
            width: "200px",
            objectFit: "fill",
          }}
        />
        <Stack sx={{ minWidth: "250px" }} spacing={1.5}>
          <Stack sx={{ width: "100%" }}>
            <TitleAndActionsButton />
            <Typography color="textSecondary" variant="subtitle1">
              {readingBook.book.authors.map((a) => a.fullName).join(", ")}
            </Typography>
          </Stack>
          <ChipStack />
          <ReadingProgress />
          <ReadingBookStats />
        </Stack>
      </Stack>
    </ReadingBookContext.Provider>
  );
}
