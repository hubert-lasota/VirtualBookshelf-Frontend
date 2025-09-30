import { useChallengeContext } from "../../ChallengeContext";
import { Stack, Typography } from "@mui/material";
import { getChallengeInfoItems } from "../../shared";

export default function ChallengeCardFooter() {
  const challenge = useChallengeContext();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {getChallengeInfoItems(challenge).map(({ icon: Icon, text }) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={(theme) => ({
            color: theme.palette.text.secondary,
          })}
        >
          <Icon style={{ height: "1rem", width: "1rem" }} />
          <Typography variant="body2" color="textSecondary">
            {text}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
