import { CurrentBookshelf, isBookshelfResponse } from "../models";
import { Stack, Typography } from "@mui/material";
import BookshelfActionsButton from "./BookshelfActionsButton";

type BookshelfTabProps = {
  bookshelf: CurrentBookshelf;
  isSelected: boolean;
  onClick: () => void;
};

export default function BookshelfTab({
  bookshelf,
  isSelected,
  onClick,
}: BookshelfTabProps) {
  const isBookshelfResponseType = isBookshelfResponse(bookshelf);
  return (
    <Stack
      onClick={onClick}
      direction="row"
      spacing={1}
      sx={(theme) => ({
        minHeight: "34px",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: theme.spacing(1),
        backgroundColor: theme.palette.background.tab,
        borderRadius: theme.shape.borderRadius,
        cursor: "pointer",
        ...(isSelected
          ? {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary["100"],
            }
          : {}),
      })}
    >
      <Typography variant="subtitle1">{`${bookshelf.name} (${bookshelf.totalBooks})`}</Typography>
      {isBookshelfResponseType && isSelected && <BookshelfActionsButton />}
    </Stack>
  );
}
