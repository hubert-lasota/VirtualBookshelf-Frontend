import { Card, CardProps } from "@mui/material";
import BookTitle from "./BookTitle";
import BookCover from "./BookCover";
import BookAuthors from "./BookAuthors";
import { BookContext } from "./BookContext";
import { BookResponse } from "../../../models/bookModels";
import React from "react";

type BookCardProps = {
  book: BookResponse;
} & CardProps;

type BookCardComponent = React.FC<BookCardProps> & {
  Cover: typeof BookCover;
  Title: typeof BookTitle;
  Authors: typeof BookAuthors;
};

const BookCard: BookCardComponent = ({
  book,
  children,
  ...props
}: BookCardProps) => {
  return (
    <BookContext.Provider value={book}>
      <Card {...props}>{children}</Card>
    </BookContext.Provider>
  );
};

BookCard.Cover = BookCover;
BookCard.Title = BookTitle;
BookCard.Authors = BookAuthors;

export default BookCard;
