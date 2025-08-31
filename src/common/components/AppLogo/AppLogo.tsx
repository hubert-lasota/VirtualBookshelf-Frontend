import { Stack, StackProps, Typography } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { useUserContext } from "../../auth/UserContext";
import { useNavigate } from "react-router-dom";
import { mergeSx } from "../../utils";

type AppLogoProps = StackProps & {
  navigateTo?: string;
};

export default function AppLogo({ navigateTo, sx, ...props }: AppLogoProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      onClick={handleNavigate}
      sx={mergeSx(
        {
          ...(!!navigateTo ? { cursor: "pointer" } : {}),
          userSelect: "none",
          width: "100%",
        },
        sx,
      )}
      {...props}
    >
      <LocalLibraryIcon color="primary" fontSize="large" />
      <Typography
        component="h1"
        variant="h5"
        fontWeight="600"
        color="textPrimary"
      >
        {isPlLanguage ? "Wirtualny Regał" : "Virtual Bookshelf"}
      </Typography>
    </Stack>
  );
}
