import { Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import AddButton from "../../../common/components/ui/Button/AddButton";

export default function ChallengesViewHeader() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack
      direction="row"
      sx={{ width: "100%", justifyContent: "space-between" }}
    >
      <Stack>
        <Typography fontSize="30px" fontWeight={600}>
          {isPlLanguage ? "Wyzwania czytelnicze" : "Reading Challenges"}
        </Typography>
        <Typography color="textSecondary">
          {isPlLanguage
            ? "Wyznaczaj cele i śledź swoje postępy w czytaniu"
            : "Set goals and track your reading progress"}
        </Typography>
      </Stack>
      <AddButton>{isPlLanguage ? "Dodaj wyzwanie" : "Add challenge"}</AddButton>
    </Stack>
  );
}
