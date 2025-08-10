import { Stack } from "@mui/material";
import ChallengeHeader from "./ChallengeHeader/ChallengeHeader";
import { VIEW_SPACING } from "../LoggedInViewContainer/config";
import ChallengeToolbar from "./ChallengeToolbar";
import ChallengeGrid from "./ChallengeGrid/ChallengeGrid";

export default function ChallengeView() {
  return (
    <Stack
      spacing={3}
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        padding: theme.spacing(VIEW_SPACING),
      })}
    >
      <ChallengeHeader />
      <ChallengeToolbar />
      <ChallengeGrid />
    </Stack>
  );
}
