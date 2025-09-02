import { BookResponse } from "../../common/models/bookModels";
import { AuthorResponse } from "../../common/models/authorModels";
import { UserResponse } from "../../common/models/userModels";
import ResourceCard, { ResourceCardProps } from "./ResourceCard";
import { ResourceType } from "./models";
import { NavigateFunction, useNavigate } from "react-router-dom";
import BookCover from "../../common/components/Book/BookCover";
import AuthorProfilePicture from "../../common/components/Author/AuthorProfilePicture";
import UserProfilePicture from "./UserProfilePicture";
import { Grid } from "@mui/material";

const getResourceProps = (
  resource: BookResponse | AuthorResponse | UserResponse,
  resourceType: ResourceType,
  navigate: NavigateFunction,
): ResourceCardProps => {
  const imgSx = { width: "250px", height: "300px" };
  switch (resourceType) {
    case "book":
      const book = resource as BookResponse;
      return {
        title: book.title,
        subtitle: book.authors.map((author) => author.fullName).join(", "),
        image: <BookCover coverUrl={book.coverUrl} sx={imgSx} />,
        onClick: () => navigate(`/books/${book.id}`),
      };
    case "author":
      const author = resource as AuthorResponse;
      return {
        title: author.fullName,
        image: (
          <AuthorProfilePicture
            profilePictureUrl={author.profilePictureUrl}
            sx={imgSx}
          />
        ),
        onClick: () => navigate(`/authors/${author.id}`),
      };
    case "user":
      const user = resource as UserResponse;
      const { firstName, lastName, pictureUrl } = user.profile;
      return {
        title: firstName + " " + lastName,
        subtitle: user.username,
        image: <UserProfilePicture profilePictureUrl={pictureUrl} sx={imgSx} />,
        onClick: () => {},
      };
  }
};

type ResourceGridProps = {
  resources: (BookResponse | AuthorResponse | UserResponse)[];
  resourceType: ResourceType;
};
export default function ResourceGrid({
  resources,
  resourceType,
}: ResourceGridProps) {
  const navigate = useNavigate();

  return (
    <Grid container spacing={5}>
      {resources.map((resource) => (
        <ResourceCard {...getResourceProps(resource, resourceType, navigate)} />
      ))}
    </Grid>
  );
}
