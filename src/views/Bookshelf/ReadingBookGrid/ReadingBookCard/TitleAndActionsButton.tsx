import { Stack, Typography } from "@mui/material";
import ReadingBookActionsButton from "./ReadingBookActions/ReadingBookActionsButton";
import { useReadingBookContext } from "./ReadingBookContext";

export default function TitleAndActionsButton() {
  const { book } = useReadingBookContext();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ width: "100%" }}
    >
      <Typography fontWeight={600} variant="h6">
        {book.title}
      </Typography>
      <ReadingBookActionsButton />
    </Stack>
  );
}
