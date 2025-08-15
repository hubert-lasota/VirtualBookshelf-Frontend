import { LinearProgress, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";
import { useReadingBookContext } from "./ReadingBookContext";

export default function ReadingProgress() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { progressPercentage } = useReadingBookContext();

  return (
    <Stack
      sx={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        paddingInline: "0.7rem",
        paddingBottom: "0.7rem",
        paddingTop: "0.5rem",
        backgroundColor: "rgba(0,0,0, 0.04)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" color="textPrimary">
          {isPlLanguage ? "Postęp " : "Progress "}
          {progressPercentage}
          {"%"}
        </Typography>
        <Typography variant="subtitle2" color="textPrimary"></Typography>
      </Stack>
      <LinearProgress
        value={progressPercentage}
        variant="determinate"
        sx={{ borderRadius: "6px" }}
      />
    </Stack>
  );
}
