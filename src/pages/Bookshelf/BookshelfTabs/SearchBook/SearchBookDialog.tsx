import {
  Dialog,
  DialogActions,
  DialogContent,
  Pagination,
  TextField,
} from "@mui/material";

import DialogTitleWithCloseButton from "../../../../common/components/Dialog/DliagotTitleWithCloseButton";
import { useUserContext } from "../../../../common/auth/UserContext";
import { useState } from "react";
import { useDebounceValue } from "../../../../common/hooks";
import { useGetBooks } from "../../../../common/api/clients/bookClient";
import SearchBookResult from "./SearchBookResult";

type SearchBookDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function SearchBookDialog({
  open,
  onClose,
}: SearchBookDialogProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query);
  const [page, setPage] = useState(1);

  const { data: { books = [], totalPages = 0 } = {} } = useGetBooks({
    query: debouncedQuery,
    size: 10,
    page: page - 1,
  });

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { minHeight: "80%", minWidth: "65%" },
        },
      }}
    >
      <DialogTitleWithCloseButton onClose={onClose} variant="h5">
        {isPlLanguage ? "Szukaj książki" : "Search book"}
      </DialogTitleWithCloseButton>
      <DialogContent sx={{ width: "100%", overflowY: "auto" }} dividers>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          label={isPlLanguage ? "Szukaj" : "Search"}
          sx={{ width: "95%" }}
        />
        <SearchBookResult books={books} />
      </DialogContent>
      {totalPages > 1 && (
        <DialogActions sx={{ justifyContent: "center" }}>
          <Pagination
            page={page}
            onChange={(_e, page) => setPage(page)}
            variant="outlined"
            shape="rounded"
          />
        </DialogActions>
      )}
    </Dialog>
  );
}
