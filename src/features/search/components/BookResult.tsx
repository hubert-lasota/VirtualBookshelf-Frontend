import PaperResultContainer from "./PaperResultContainer";
import { Avatar, Stack, Typography } from "@mui/material";
import { BookResponse } from "../../book/bookModels";
import { useNavigate } from "react-router-dom";

type BookResultProps = {
  book: BookResponse;
  onClick?: (book: BookResponse) => void;
};

export default function BookResult({ book, onClick }: BookResultProps) {
  const navigate = useNavigate();

  const handleClick = () =>
    onClick ? onClick(book) : navigate(`/books/${book.id}`);

  return (
    <PaperResultContainer onClick={handleClick}>
      <Stack>
        <Avatar src={book.coverUrl} />
        <Stack direction="column">
          <Typography variant="body1">{book.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {book.authors.map((author) => author.fullName).join(", ")}
          </Typography>
        </Stack>
      </Stack>
    </PaperResultContainer>
  );
}
