import { Box, Chip, Stack } from "@mui/material";
import ReadingBookActionsButton from "./ReadingBookActions/ReadingBookActionsButton";
import ReadingProgress from "./ReadingProgress";
import { useReadingBookContext } from "./ReadingBookContext";
import BookCover from "../../../../common/components/Book/BookCover";

type ReadingBookCoverProps = {
  onPointingCardChange: (isPointingCard: boolean) => void;
};

export default function ReadingBookCover({
  onPointingCardChange,
}: ReadingBookCoverProps) {
  const { bookshelf, book } = useReadingBookContext();

  return (
    <Box sx={{ height: "300px", width: "200px", position: "relative" }}>
      <Stack
        direction="row"
        sx={{
          position: "absolute",
          top: 12,
          paddingInline: "16px",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Chip label={bookshelf.name} color="primary" sx={{ height: "30px" }} />

        <ReadingBookActionsButton onClose={() => onPointingCardChange(false)} />
      </Stack>
      <ReadingProgress />
      <BookCover
        coverUrl={book.coverUrl}
        sx={{
          height: "100%",
          width: "100%",
          objectFit: "fill",
        }}
      />
    </Box>
  );
}
