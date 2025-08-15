import { useReadingBookContext } from "./ReadingBookContext";
import { Calendar, StickyNote } from "lucide-react";
import { Stack, Typography } from "@mui/material/esm";
import { useTheme } from "@mui/material";

export default function ReadingBookDetailsItems() {
  const { startedReadingAt, totalNotes } = useReadingBookContext();

  const theme = useTheme();

  const detailsItems = [
    {
      value: new Date(startedReadingAt).toLocaleDateString(),
      icon: Calendar,
    },
    {
      value: totalNotes,
      icon: StickyNote,
    },
  ];

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      {detailsItems.map(({ value, icon: Icon }) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Icon
            style={{
              width: "14px",
              height: "14px",
              color: theme.palette.text.secondary,
            }}
          />
          <Typography variant="body2" color="textSecondary">
            {value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
