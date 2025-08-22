import { Stack, Typography } from "@mui/material";
import ReadingSessionActionsButton from "./ReadingSessionActionsButton";
import { useReadingSessionContext } from "./ReadingSessionContext";

export default function ReadingSessionCardHeader() {
  const { book } = useReadingSessionContext();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h5">{book.title}</Typography>
      <ReadingSessionActionsButton />
    </Stack>
  );
}
