import { Button, Paper, Stack, Typography } from "@mui/material";
import ShelvesIcon from "@mui/icons-material/Shelves";
import { useUserContext } from "../../common/auth/UserContext";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import BookshelfForm from "./BookshelfForm/BookshelfForm";

export default function EmptyBookshelf() {
  const [openCreateBookshelf, setOpenCreateBookshelf] = useState(false);
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <>
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
            onClick={() => setOpenCreateBookshelf(true)}
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
      <BookshelfForm
        open={openCreateBookshelf}
        onClose={() => setOpenCreateBookshelf(false)}
      />
    </>
  );
}
