import { useNavigate } from "react-router-dom";
import { AuthorResponse } from "../../models/authorModels";
import AuthorProfilePicture, {
  AuthorProfilePictureProps,
} from "./AuthorProfilePicture";
import { Stack, Typography } from "@mui/material";
import ReviewStatsStack from "../Review/ReviewStatsStack";

type Props = {
  author: AuthorResponse;
  authorProfilePictureProps?: Omit<
    AuthorProfilePictureProps,
    "profilePictureUrl"
  >;
};

export default function AuthorCard({
  author,
  authorProfilePictureProps,
}: Props) {
  const navigate = useNavigate();

  return (
    <Stack
      sx={(theme) => ({
        borderRadius: theme.shape.borderRadius,
        cursor: "pointer",
        boxShadow: theme.shadows[1],
        transition: theme.transitions.create("box-shadow"),
        "&:hover": {
          boxShadow: theme.shadows[3],
        },
      })}
      onClick={() => navigate(`/authors/${author.id}`)}
    >
      <AuthorProfilePicture
        profilePictureUrl={author.profilePictureUrl}
        {...authorProfilePictureProps}
      />
      <Stack
        spacing={1}
        sx={(theme) => ({
          padding: theme.spacing(2),
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          borderTopWidth: "0px",
        })}
      >
        <Typography variant="h6">{author.fullName}</Typography>
        <ReviewStatsStack
          averageRating={author.averageRating}
          totalReviews={author.totalReviews}
        />
      </Stack>
    </Stack>
  );
}
