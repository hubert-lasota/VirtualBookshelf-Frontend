import { useUserContext } from "../../../../common/auth/UserContext";
import { Dialog, DialogContent, Pagination } from "@mui/material";
import CommonDialogTitle from "../../../../common/components/Dialog/CommonDialogTitle";
import ToolbarSearchTextField from "../../../../common/components/Toolbar/ToolbarSearchTextField";
import { useGetChallenges } from "../../../../common/api/clients/challengeClient";
import { useState } from "react";
import ChallengeResult from "./ChallengeResult";
import { DialogContext } from "../../../../common/context/DialogContext";
import CommonDialogActions from "../../../../common/components/Dialog/CommonDialogActions";

type Props = {
  onClose: () => void;
};

export default function JoinChallengeDialog({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { data: { challenges = [], pageMeta: { totalPages = 0 } = {} } = {} } =
    useGetChallenges({
      participating: false,
      query: query || undefined,
      page: page - 1,
      size: 10,
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
          title={isPlLanguage ? "Szukaj wyzwania" : "Search challenge"}
        />
        <DialogContent>
          <ToolbarSearchTextField
            fullWidth
            sx={(theme) => ({ marginBottom: theme.spacing(2) })}
            onDebounceValueChange={setQuery}
          />
          <ChallengeResult challenges={challenges} />
        </DialogContent>
        {totalPages > 1 && (
          <CommonDialogActions sx={{ justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_e, page) => setPage(page)}
            />
          </CommonDialogActions>
        )}
      </Dialog>
    </DialogContext.Provider>
  );
}
