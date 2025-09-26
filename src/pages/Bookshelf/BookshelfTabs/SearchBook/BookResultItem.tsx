import { BookResponse } from "../../../../common/models/bookModels";
import { Stack, Typography } from "@mui/material";
import AddBookButton from "./AddBookButton";

type BookResultItemProps = { book: BookResponse };

export default function BookResultItem({ book }: BookResultItemProps) {
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
      <Stack direction="row" spacing={2}>
        <img alt={book.title} src={book.coverUrl} width={70} height={90} />
        <div>
          <Typography variant="h6" color="textPrimary">
            {book.title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {book.authors.map((a) => a.fullName).join(", ")}
          </Typography>
        </div>
      </Stack>
      <AddBookButton />
    </Stack>
  );
}
