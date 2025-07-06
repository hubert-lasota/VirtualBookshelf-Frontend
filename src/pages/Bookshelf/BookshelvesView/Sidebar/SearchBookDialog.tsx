import { DialogProps } from "@mui/material";
import SearchDialogContainer from "../../../../common/components/Search/SearchDialogContainer";

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
