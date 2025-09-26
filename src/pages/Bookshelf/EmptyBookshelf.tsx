import { Button, Paper, Stack, Typography } from "@mui/material";
import ShelvesIcon from "@mui/icons-material/Shelves";
import { useUserContext } from "../../common/auth/UserContext";
import AddIcon from "@mui/icons-material/Add";
import { useBookshelfPageContext } from "./BookshelfPageContext";
import { BookshelfFormMode } from "./models";

export default function EmptyBookshelf() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { onFormModeChange } = useBookshelfPageContext();

  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        component={Paper}
        sx={(theme) => ({
          padding: `${theme.spacing(20)} ${theme.spacing(10)}`,
        })}
        elevation={3}
        direction="column"
      >
        <Stack direction="row">
          <ShelvesIcon
            color="action"
            fontSize="large"
            sx={(theme) => ({
              marginRight: "1rem",
              color: theme.palette.text.primary,
            })}
          />
          <Typography variant="h4">
            {isPlLanguage
              ? "Dodaj pierwszy wirtualny regał"
              : "Add your first virtual Bookshelf"}
          </Typography>
        </Stack>
        <Button
          onClick={() => onFormModeChange(BookshelfFormMode.CREATE)}
          variant="contained"
          sx={(theme) => ({
            mt: theme.spacing(3),
            width: "30%",
            alignSelf: "center",
          })}
          endIcon={<AddIcon />}
        >
          {isPlLanguage ? "Dodaj" : "Add"}
        </Button>
      </Stack>
    </Stack>
  );
}
