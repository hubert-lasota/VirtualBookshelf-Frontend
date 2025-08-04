import { Box, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../common/auth/UserContext";
import { useBookshelfViewContext } from "./BookshelfViewContext";
import AddButton from "../../common/components/ui/Button/AddButton";
import { BookshelfFormMode } from "./models";

export default function BookshelfViewHeader() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { currentBookshelf, onFormModeChange } = useBookshelfViewContext();

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", width: "100%" }}
      >
        <Typography fontSize="30px" fontWeight={600} color="textPrimary">
          {currentBookshelf.name}
        </Typography>

        <AddButton
          onClick={() => onFormModeChange(BookshelfFormMode.CREATE)}
          size="small"
        >
          {isPlLanguage ? "Dodaj regał" : "Add bookshelf"}
        </AddButton>
      </Stack>
      <Typography color="textSecondary">
        {currentBookshelf.description}
      </Typography>
    </Box>
  );
}
