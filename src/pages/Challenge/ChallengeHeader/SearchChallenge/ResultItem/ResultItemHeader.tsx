import { Stack, Typography } from "@mui/material";
import ChallengeTypeBadge from "./ChallengeTypeBadge";
import { useChallengeContext } from "../../../ChallengeContext";

export default function ResultItemHeader() {
  const { title } = useChallengeContext();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={(theme) => ({
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Typography variant="h6" color="textPrimary">
        {title}
      </Typography>
      <ChallengeTypeBadge />
    </Stack>
  );
}
