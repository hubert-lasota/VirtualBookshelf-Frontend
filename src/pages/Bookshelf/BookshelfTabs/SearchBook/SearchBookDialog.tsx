import { Dialog, DialogContent, Pagination } from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";
import { useState } from "react";
import { useDebounceValue } from "../../../../common/hooks";
import { useGetBooks } from "../../../../common/api/clients/bookClient";
import SearchBookResult from "./SearchBookResult";
import CommonDialogTitle from "../../../../common/components/Dialog/CommonDialogTitle";
import CommonDialogActions from "../../../../common/components/Dialog/CommonDialogActions";
import ToolbarSearchTextField from "../../../../common/components/Toolbar/ToolbarSearchTextField";
import { DialogContext } from "../../../../common/context/DialogContext";

type SearchBookDialogProps = {
  onClose: () => void;
};

export default function SearchBookDialog({ onClose }: SearchBookDialogProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query);
  const [page, setPage] = useState(1);

  const { data: { books = [], pageMeta: { totalPages = 0 } = {} } = {} } =
    useGetBooks({
      query: debouncedQuery,
      size: 10,
      page: page - 1,
    });

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <DialogContext.Provider value={{ onClose }}>
      <Dialog
        open
        onClose={onClose}
        slotProps={{
          paper: {
            sx: { minHeight: "80%", minWidth: "65%" },
          },
        }}
      >
        <CommonDialogTitle
          title={isPlLanguage ? "Szukaj książki" : "Search book"}
        />
        <DialogContent sx={{ width: "100%", overflowY: "auto" }}>
          <ToolbarSearchTextField
            fullWidth
            onDebounceValueChange={setQuery}
            sx={(theme) => ({ marginBottom: theme.spacing(2) })}
          />
          <SearchBookResult books={books} />
        </DialogContent>
        {totalPages > 1 && (
          <CommonDialogActions sx={{ justifyContent: "center" }}>
            <Pagination
              page={page}
              onChange={(_e, page) => setPage(page)}
              count={totalPages}
            />
          </CommonDialogActions>
        )}
      </Dialog>
    </DialogContext.Provider>
  );
}
