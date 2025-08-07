import { LinearProgress, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";

type BookReadingProgressProps = {
  progressPercentage: number;
};

export default function BookReadingProgress({
  progressPercentage,
}: BookReadingProgressProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

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
      <Typography variant="subtitle2" color="textPrimary">
        {isPlLanguage ? "Postęp " : "Progress "}
        {progressPercentage}
        {"%"}
      </Typography>
      <LinearProgress
        value={progressPercentage}
        variant="determinate"
        sx={{ borderRadius: "6px" }}
      />
    </Stack>
  );
}
