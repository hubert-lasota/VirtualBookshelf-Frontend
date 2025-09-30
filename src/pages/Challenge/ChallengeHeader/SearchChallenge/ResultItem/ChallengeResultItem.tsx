import { getChallengeInfoItems } from "../../../shared";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import JoinChallengeButton from "./JoinChallengeButton";
import { useChallengeContext } from "../../../ChallengeContext";
import ResultItemHeader from "./ResultItemHeader";

export default function ChallengeResultItem() {
  const challenge = useChallengeContext();
  const items = [
    ...getChallengeInfoItems(challenge),
    {
      icon: EmojiEventsIcon,
      text: challenge.goalValue,
    },
  ];

  return (
    <Paper
      variant="outlined"
      sx={(theme) => ({
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        "&:hover": {
          boxShadow: theme.shadows[3],
        },
      })}
    >
      <ResultItemHeader />
      <Stack
        spacing={2}
        sx={(theme) => ({
          padding: theme.spacing(2),
        })}
      >
        <Typography color="textSecondary">{challenge.description}</Typography>
        <Divider />
        <Stack direction="row" spacing={3}>
          {items.map(({ icon: Icon, text }) => (
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={(theme) => ({ color: theme.palette.text.secondary })}
            >
              <Icon
                style={{ color: "inherit", width: "16px", height: "16px" }}
              />
              <Typography variant="body2" color="textSecondary">
                {text}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <JoinChallengeButton />
      </Stack>
    </Paper>
  );
}
