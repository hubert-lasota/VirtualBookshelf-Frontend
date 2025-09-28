import { Paper, Stack } from "@mui/material";
import { ReadingBookResponse } from "../../../../common/models/readingBookModels";
import { ReadingBookContext } from "./ReadingBookContext";
import BookCover from "../../../../common/components/Book/BookCover";
import ReadingProgress from "./ReadingProgress";
import ReadingBookStats from "./ReadingBookStats";
import TitleAndActionsButton from "./TitleAndActionsButton";
import GenreStack from "../../../../common/components/Book/GenreStack";
import AuthorListTypography from "../../../../common/components/Book/AuthorListTypography";

type ReadingBookCardProps = {
  readingBook: ReadingBookResponse;
};

export default function ReadingBookCard({ readingBook }: ReadingBookCardProps) {
  return (
    <ReadingBookContext.Provider value={readingBook}>
      <Stack
        direction="row"
        sx={(theme) => ({
          width: "100%",
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[2],
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: theme.shadows[6],
          },
        })}
        component={Paper}
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
        <Stack
          sx={(theme) => ({
            paddingInline: theme.spacing(2),
            width: "100%",
          })}
          spacing={1.5}
        >
          <Stack sx={{ width: "100%" }}>
            <TitleAndActionsButton />
            <AuthorListTypography authors={readingBook.book.authors} />
            <GenreStack genres={readingBook.book.genres} />
          </Stack>
          <ReadingProgress />
          <ReadingBookStats />
        </Stack>
      </Stack>
    </ReadingBookContext.Provider>
  );
}
