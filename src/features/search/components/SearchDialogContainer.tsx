import { Dialog, DialogProps } from "@mui/material";

type SearchDialogContainerProps = Pick<
  DialogProps,
  "onClose" | "open" | "children"
>;

export default function SearchDialogContainer({
  open,
  onClose,
  children,
}: SearchDialogContainerProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        root: {
          sx: (theme) => ({ padding: theme.spacing(2) }),
        },
        paper: {
          sx: {
            width: "65%",
            minHeight: "40%",
            maxWidth: "100%",
          },
        },
      }}
    >
      {children}
    </Dialog>
  );
}
