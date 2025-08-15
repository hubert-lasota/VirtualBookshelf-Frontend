import { Stack, Typography } from "@mui/material";
import ReadingSessionActionsButton from "./ReadingSessionActionsButton";
import { useReadingSessionContext } from "./ReadingSessionContext";

export default function ReadingSessionCardHeader() {
  const { book } = useReadingSessionContext();

  return (
    <Stack direction="row">
      <Typography>{book.title}</Typography>
      <ReadingSessionActionsButton />
    </Stack>
  );
}
