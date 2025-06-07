import { Button, CardActions, Grid } from "@mui/material";
import BookCard from "../../features/book/card/BookCard";
import { useUserContext } from "../../features/user/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { BookshelfBookWithId } from "../../features/bookshelf/models";

type BookGridProps = {
  books: BookshelfBookWithId[];
};

export default function BookGrid({ books }: BookGridProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Grid container>
      {books.map((bookshelfBook) => (
        <Grid key={`book-grid-item-${bookshelfBook.id}`}>
          <BookCard book={bookshelfBook.book}>
            <BookCard.Cover />
            <BookCard.Title />
            <BookCard.Authors />
          </BookCard>
          <CardActions>
            <Button size="small">{isPlLanguage ? "Edytuj" : "Edit"}</Button>
            <Button
              size="small"
              color="error"
              startIcon={<DeleteIcon color="error" fontSize="small" />}
            >
              {isPlLanguage ? "Usuń" : "Delete"}
            </Button>
          </CardActions>
        </Grid>
      ))}
    </Grid>
  );
}
