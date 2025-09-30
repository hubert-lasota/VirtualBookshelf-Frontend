import { Stack, Typography } from "@mui/material";
import AddBookButton from "./AddBookButton";
import BookCover from "../../../../common/components/Book/BookCover";
import AuthorListTypography from "../../../../common/components/Book/AuthorListTypography";
import GenreStack from "../../../../common/components/Book/GenreStack";
import { useBookContext } from "./BookContext";

export default function BookResultItem() {
  const { title, coverUrl, authors, genres } = useBookContext();

  return (
    <Stack
      direction="row"
      sx={(theme) => ({
        justifyContent: "space-between",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        paddingInline: theme.spacing(1),
        paddingBlock: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Stack direction="row" spacing={2.5}>
        <BookCover coverUrl={coverUrl} sx={{ width: 70, height: "100%" }} />
        <div>
          <Typography variant="h6" color="textPrimary">
            {title}
          </Typography>
          <AuthorListTypography authors={authors} />
          <GenreStack genres={genres} />
        </div>
      </Stack>
      <Stack alignItems="center" justifyContent="center">
        <AddBookButton />
      </Stack>
    </Stack>
  );
}
