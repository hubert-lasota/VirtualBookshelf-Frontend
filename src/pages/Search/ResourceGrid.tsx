import { Grid } from "@mui/material";
import { useSearchPageContext } from "./SearchPageContext";
import BookCard from "../../common/components/Book/BookCard";
import AuthorCard from "../../common/components/Author/AuthorCard";
import { RESOURCE_IMG_SX } from "./config";
import UserCard from "./UserCard/UserCard";

export default function ResourceGrid() {
  const { resourceType, books, authors, users } = useSearchPageContext();

  const resourceCards = (() => {
    switch (resourceType) {
      case "book":
        return books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            bookCoverProps={{ sx: RESOURCE_IMG_SX }}
          />
        ));
      case "author":
        return authors.map((author) => (
          <AuthorCard
            key={author.id}
            author={author}
            authorProfilePictureProps={{ sx: RESOURCE_IMG_SX }}
          />
        ));
      case "user":
        return users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            userProfilePictureProps={{ sx: RESOURCE_IMG_SX }}
          />
        ));
    }
  })();
  return (
    <Grid container spacing={2}>
      {resourceCards.map((resourceCard) => (
        <Grid size={2}>{resourceCard}</Grid>
      ))}
    </Grid>
  );
}
