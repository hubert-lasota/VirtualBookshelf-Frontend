import { LinearProgress, Stack, Typography, useTheme } from "@mui/material";
import { BookOpen as BookOpenIcon } from "lucide-react";

type BookReadingProgressProps = {
  progressPercentage: number;
};

export default function BookReadingProgress({
  progressPercentage,
}: BookReadingProgressProps) {
  const theme = useTheme();

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
      <Stack direction="row" spacing={0.5} alignItems="center">
        <BookOpenIcon
          style={{
            width: "14px",
            height: "14px",
            color: theme.palette.text.secondary,
          }}
        />
        <Typography variant="subtitle2" color="textSecondary">
          {progressPercentage}
          {"%"}
        </Typography>
      </Stack>
      <LinearProgress
        value={progressPercentage}
        variant="determinate"
        sx={{ borderRadius: "6px" }}
      />
    </Stack>
  );
}
