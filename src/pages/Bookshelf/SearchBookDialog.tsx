import { DialogProps } from "@mui/material";
import SearchDialogContainer from "../../features/search/components/SearchDialogContainer";

type SearchBookDialogProps = Pick<DialogProps, "open" | "onClose">;

export default function SearchBookDialog({
  open,
  onClose,
}: SearchBookDialogProps) {
  return (
    <SearchDialogContainer open={open} onClose={onClose}>
      {"text123123"}
    </SearchDialogContainer>
  );
}
