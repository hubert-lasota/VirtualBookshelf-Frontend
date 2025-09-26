import { useReadingBookContext } from "./ReadingBookContext";
import { Chip, Stack } from "@mui/material";
import { ReadingStatus } from "../../../../common/models/readingBookModels";
import { useUserContext } from "../../../../common/auth/UserContext";

const statusLabel = (status: ReadingStatus, isPlLanguage: boolean) => {
  switch (status) {
    case ReadingStatus.READ:
      return isPlLanguage ? "Przeczytane" : "Read";
    case ReadingStatus.READING:
      return isPlLanguage ? "W trakcie czytania" : "Reading";
    case ReadingStatus.WANT_TO_READ:
      return isPlLanguage ? "Chcę przeczytać" : "Want to read";
  }
};

export default function ChipStack() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { status, bookshelf } = useReadingBookContext();

  const chipValues = [bookshelf.name, statusLabel(status, isPlLanguage)];

  return (
    <Stack direction="row" justifyContent="space-between">
      {chipValues.map((val) => (
        <Chip
          label={val}
          color="primary"
          sx={(theme) => ({ borderRadius: theme.shape.borderRadius })}
        />
      ))}
    </Stack>
  );
}
