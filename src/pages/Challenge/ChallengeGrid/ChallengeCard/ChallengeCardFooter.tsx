import { useChallengeContext } from "./ChallengeContext";
import { Stack, Typography } from "@mui/material";
import { Calendar as CalendarIcon, Users as UsersIcon } from "lucide-react";

export default function ChallengeCardFooter() {
  const {
    durationRange: { startAt, endAt },
    totalParticipants,
  } = useChallengeContext();

  const items = [
    {
      icon: CalendarIcon,
      text:
        new Date(startAt).toLocaleDateString() +
        " - " +
        new Date(endAt).toLocaleDateString(),
    },
    {
      icon: UsersIcon,
      text: totalParticipants,
    },
  ];

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {items.map(({ icon: Icon, text }) => (
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
