import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material";
import { useUserContext } from "../../auth/UserContext";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { ReactNode, useState } from "react";
import CancelButton from "../Button/CancelButton";
import { DialogContext } from "../../context/DialogContext";
import CommonDialogTitle from "../Dialog/CommonDialogTitle";

export type ToolbarFilterButtonProps = {
  title?: ReactNode;
  content: ReactNode;
  onReset: () => void;
  onApply: () => void;
};
export default function ToolbarFilterButton({
  title,
  content,
  onReset,
  onApply,
}: ToolbarFilterButtonProps) {
  const [open, setOpen] = useState(false);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogContext.Provider value={{ onClose: handleClose }}>
      <Button
        variant="outlined"
        startIcon={<FilterAltIcon />}
        onClick={() => setOpen(true)}
        sx={(theme) => ({ backgroundColor: theme.palette.background.paper })}
      >
        {isPlLanguage ? "Filtry" : "Filters"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { sx: { minWidth: "55%" } } }}
      >
        <CommonDialogTitle
          title={title ?? (isPlLanguage ? "Filtry" : "Filters")}
          showDivider={false}
        />
        <DialogContent dividers>{content}</DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            onClick={() => {
              onReset();
              handleClose();
            }}
          >
            {isPlLanguage ? "Resetuj" : "Reset"}
          </Button>
          <Stack direction="row" spacing={1}>
            <CancelButton onClick={handleClose} />
            <Button
              variant="contained"
              onClick={() => {
                onApply();
                handleClose();
              }}
            >
              {isPlLanguage ? "Zastosuj" : "Apply"}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
}
