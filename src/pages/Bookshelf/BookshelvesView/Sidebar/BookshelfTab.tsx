import { Box, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";
import BookshelfActionsButton from "./BookshelfActionsButton";

type BookshelfTabProps = {
  name: string;
  totalBooks: number;
  isSelected: boolean;
  disableConfig?: boolean;
  onSelect: () => void;
};

export default function BookshelfTab({
  name,
  totalBooks,
  isSelected,
  onSelect,
  disableConfig = false,
}: BookshelfTabProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack
      onClick={onSelect}
      direction="row"
      spacing={2}
      sx={(theme) => ({
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(1.5),
        borderRadius: theme.spacing(1),
        cursor: "pointer",
        width: "100%",
        border: "2px solid transparent",
        transitionProperty: "background-color border",
        transitionDuration: "0.15s",
        transitionTimingFunction: "ease-in-out",
        ...(isSelected
          ? {
              backgroundColor: "rgb(239 246 255)",
              borderColor: theme.palette.primary.light,
            }
          : {
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }),
      })}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={(theme) => ({
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: isSelected
              ? theme.palette.primary.main
              : theme.palette.action.disabled,
          })}
        />
        <Stack>
          <Typography fontSize="0.88rem">{name}</Typography>
          <Typography fontSize="0.78rem" color="textSecondary">
            {`${totalBooks} `}
            {isPlLanguage
              ? totalBooks === 1
                ? "książka"
                : "książek"
              : totalBooks === 1
                ? "book"
                : "books"}
          </Typography>
        </Stack>
      </Stack>
      {!disableConfig && <BookshelfActionsButton />}
    </Stack>
  );
}
