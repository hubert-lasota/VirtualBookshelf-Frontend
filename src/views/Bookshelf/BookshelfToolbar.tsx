import { Paper, Stack } from "@mui/material";
import SearchTextField from "../../pages/Bookshelf/BookshelvesView/SearchTextField";

export default function BookshelfToolbar() {
  return (
    <Stack
      direction="row"
      component={Paper}
      variant="outlined"
      sx={(theme) => ({
        paddingInline: theme.spacing(2),
        paddingBlock: theme.spacing(3),
      })}
    >
      <SearchTextField />
    </Stack>
  );
}
