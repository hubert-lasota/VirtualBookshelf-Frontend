import { Dialog, DialogProps, Stack } from "@mui/material";
import ManageBookshelvesHeader from "./ManageBookshelvesHeader";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import { Action, ManageBookshelvesContext } from "./ManageBookshelvesContext";
import { useState } from "react";
import { Bookshelf } from "../../../features/bookshelf/models";

export default function ManageBookshelvesDialog({
  open,
  onClose,
}: Pick<DialogProps, "open" | "onClose">) {
  const [action, setAction] = useState<Action>(Action.UNKNOWN);
  const [selectedBookshelf, setSelectedBookshelf] = useState<Bookshelf | null>(
    null,
  );

  return (
    <ManageBookshelvesContext.Provider
      value={{
        action,
        setAction,
        selectedBookshelf,
        setSelectedBookshelf,
      }}
    >
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={false}
        sx={(theme) => ({
          "& .MuiPaper-root": {
            borderRadius: theme.spacing(0.5),
            width: "75%",
            height: "75%",
          },
        })}
      >
        <ManageBookshelvesHeader onClose={onClose} />
        <Stack
          direction="row"
          gap={2}
          sx={(theme) => ({
            width: "100%",
            height: "100%",
            backgroundColor: "#f1f3fa",
            padding: theme.spacing(2),
          })}
        >
          <LeftColumn />
          <RightColumn />
        </Stack>
      </Dialog>
    </ManageBookshelvesContext.Provider>
  );
}
