import { Book } from "../models";
import { Card, CardProps } from "@mui/material";
import BookTitle from "./BookTitle";
import BookCover from "./BookCover";
import BookAuthors from "./BookAuthors";

type BookCardProps = {
  book: Book;
} & CardProps;

export default function BookCard({ book, children, ...props }: BookCardProps) {
  return <Card {...props}>{children}</Card>;
}

BookCard.Cover = BookCover;
BookCard.Title = BookTitle;
BookCard.Authors = BookAuthors;
