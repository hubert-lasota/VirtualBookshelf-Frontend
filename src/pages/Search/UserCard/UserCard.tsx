import { UserResponse } from "../../../common/models/userModels";
import UserProfilePicture, {
  UserProfilePictureProps,
} from "./UserProfilePicture";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../common/auth/UserContext";
import { Stack, Typography } from "@mui/material";

type Props = {
  user: UserResponse;
  userProfilePictureProps?: Omit<UserProfilePictureProps, "profilePictureUrl">;
};

export default function UserCard({ user, userProfilePictureProps }: Props) {
  const {
    user: { id },
  } = useUserContext();

  const navigate = useNavigate();
  const navTo = id === user.id ? "/profile" : `/users/${user.id}`;
  const profile = user.profile;
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
      onClick={() => navigate(navTo)}
    >
      <UserProfilePicture
        profilePictureUrl={profile.pictureUrl}
        {...userProfilePictureProps}
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
        <Typography variant="h6">
          {profile.firstName + " " + profile.lastName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {user.username}
        </Typography>
      </Stack>
    </Stack>
  );
}
