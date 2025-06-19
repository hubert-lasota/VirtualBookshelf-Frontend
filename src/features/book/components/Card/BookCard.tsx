import { BookResponse } from "../../bookModels";
import { Card, CardProps } from "@mui/material";
import BookTitle from "./BookTitle";
import BookCover from "./BookCover";
import BookAuthors from "./BookAuthors";
import { BookContext } from "./BookContext";

type BookCardProps = {
  book: BookResponse;
} & CardProps;

export default function BookCard({ book, children, ...props }: BookCardProps) {
  return (
    <BookContext.Provider value={book}>
      <Card {...props}>{children}</Card>
    </BookContext.Provider>
  );
}

BookCard.Cover = BookCover;
BookCard.Title = BookTitle;
BookCard.Authors = BookAuthors;
