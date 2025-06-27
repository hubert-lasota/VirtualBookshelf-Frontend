import PaperResultContainer from "./PaperResultContainer";
import { Stack, Typography } from "@mui/material";
import { BookResponse } from "../../../models/bookModels";
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
      <Stack direction="row" spacing={2} sx={{ width: "100%", height: "100%" }}>
        <img
          src={book.coverUrl || "src/assets/book_cover.jpg"}
          alt={book.title}
          style={{ height: 140, width: 110, objectFit: "cover" }}
        />

        <Stack direction="column">
          <Typography fontSize="1.4rem">{book.title}</Typography>
          <Typography fontSize="1rem" color="textSecondary">
            {book.authors.map((author) => author.fullName).join(", ")}
          </Typography>
        </Stack>
      </Stack>
    </PaperResultContainer>
  );
}
