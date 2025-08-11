import { Stack, Typography } from "@mui/material";
import ChallengeActionsButton from "./ActionsButton/ChallengeActionsButton";
import { useChallengeContext } from "./ChallengeContext";

export default function ChallengeCardHeader() {
  const { title } = useChallengeContext();
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography
        variant="subtitle1"
        color="textPrimary"
        fontWeight="550"
        fontSize="1.2rem"
      >
        {title}
      </Typography>
      <ChallengeActionsButton />
    </Stack>
  );
}
