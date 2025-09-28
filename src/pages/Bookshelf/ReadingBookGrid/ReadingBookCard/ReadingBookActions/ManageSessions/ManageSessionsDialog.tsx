import ManageSessionsTitle from "./ManageSessionsTitle";
import { useState } from "react";
import { ReadingSessionResponse } from "../../../../../../common/models/readingSessionModels";
import { useDebounceValue } from "../../../../../../common/hooks";
import { useReadingBookContext } from "../../ReadingBookContext";
import SessionToolbar from "./SessionToolbar";
import SessionForm from "./SessionForm";
import { Dialog, DialogContent, Stack } from "@mui/material";
import { useGetReadingSessions } from "../../../../../../common/api/clients/readingSessionClient";
import SessionCard from "./SessionCard/SessionCard";

type ManageSessionsDialogProps = {
  onClose: () => void;
};

export default function ManageSessionsDialog({
  onClose,
}: ManageSessionsDialogProps) {
  const readingBook = useReadingBookContext();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query);
  const { data: { sessions = [] } = {} } = useGetReadingSessions({
    readingBookId: readingBook.id,
    query: debouncedQuery,
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sessionToUpdate, setSessionToUpdate] =
    useState<ReadingSessionResponse>();

  return (
    <Dialog
      open
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            minWidth: "70%",
          },
        },
      }}
    >
      <ManageSessionsTitle onClose={onClose} />
      <DialogContent>
        {isFormOpen ? (
          <SessionForm
            session={sessionToUpdate}
            onCloseForm={() => setIsFormOpen(false)}
          />
        ) : (
          <>
            <SessionToolbar
              query={query}
              onQueryChange={setQuery}
              onAddSession={() => {
                setIsFormOpen(true);
                setSessionToUpdate(undefined);
              }}
            />
            <Stack spacing={2} sx={{ marginTop: "1rem" }}>
              {sessions.map((session) => (
                <SessionCard session={session} />
              ))}
            </Stack>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
