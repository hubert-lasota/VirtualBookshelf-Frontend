import { Stack, Typography } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { useUserContext } from "../../../features/user/UserContext";

export default function AppLogo() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <LocalLibraryIcon color="primary" fontSize="large" />
      <Typography component="h1" variant="h5" fontWeight="600">
        {isPlLanguage ? "Wirtualny Regał" : "Virtual Bookshelf"}
      </Typography>
    </Stack>
  );
}
