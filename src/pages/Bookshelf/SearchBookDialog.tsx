import { DialogProps } from "@mui/material";

type SearchBookDialogProps = Pick<DialogProps, "open" | "onClose">;

export default function SearchBookDialog({
  open,
  onClose,
}: SearchBookDialogProps) {
  return null;
}
