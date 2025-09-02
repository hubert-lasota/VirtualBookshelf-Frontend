import { Paper, Stack, Typography } from "@mui/material";
import { useAuthorDetailsContext } from "../AuthorDetailsContext";
import { useUserContext } from "../../../common/auth/UserContext";
import AuthorProfilePicture from "../../../common/components/Author/AuthorProfilePicture";

export default function AuthorDetailsCard() {
  const { profilePictureUrl, fullName, description } =
    useAuthorDetailsContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack
      direction="row"
      component={Paper}
      variant="outlined"
      spacing={5}
      sx={(theme) => ({
        borderRadius: theme.shape.borderRadius,
        paddingInline: theme.spacing(4),
        paddingBlock: theme.spacing(3),
      })}
    >
      <AuthorProfilePicture
        profilePictureUrl={profilePictureUrl}
        sx={{ width: "30%" }}
      />
      <Stack spacing={3} sx={{ width: "70%" }}>
        <Typography variant="h4" color="textPrimary">
          {fullName}
        </Typography>
        <Stack spacing={1}>
          <Typography variant="h6">
            {isPlLanguage ? "Opis" : "Description"}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {description ?? (isPlLanguage ? "Brak opisu" : "No description")}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
