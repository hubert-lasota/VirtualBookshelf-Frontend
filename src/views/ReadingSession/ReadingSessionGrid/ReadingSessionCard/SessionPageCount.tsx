import { Stack, Typography } from "@mui/material";
import { useReadingSessionContext } from "./ReadingSessionContext";
import { BookOpenText as BookOpenTextIcon } from "lucide-react";

export default function SessionPageCount() {
  const {
    pageRange: { readPages },
  } = useReadingSessionContext();

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <BookOpenTextIcon style={{ width: "16px", height: "16px" }} />
      <Typography variant="inherit" color="inherit">
        {readPages}
      </Typography>
    </Stack>
  );
}
