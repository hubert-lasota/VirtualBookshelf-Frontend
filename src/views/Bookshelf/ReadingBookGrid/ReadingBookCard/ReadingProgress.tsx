import { LinearProgress, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";
import { useReadingBookContext } from "./ReadingBookContext";

export default function ReadingProgress() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { progressPercentage, currentPage, book } = useReadingBookContext();

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" color="textPrimary">
          {isPlLanguage ? "Postęp " : "Progress "}
        </Typography>
        <Typography variant="subtitle2" color="textPrimary">
          {currentPage}
          {" / "}
          {book.pageCount}
          {isPlLanguage ? " str." : " pages"}
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
