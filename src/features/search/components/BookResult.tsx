import ResultContainer from "./ResultContainer";
import { Avatar, Stack, Typography } from "@mui/material";
import { Book } from "../../book/models";

type BookResultProps = {
  book: Book;
};

export default function BookResult({ book }: BookResultProps) {
  return (
    <ResultContainer>
      <Stack>
        <Avatar src={book.coverUrl} />
        <Stack direction="column">
          <Typography variant="body1">{book.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {book.authors.map((author) => author.fullName).join(", ")}
          </Typography>
        </Stack>
      </Stack>
    </ResultContainer>
  );
}
