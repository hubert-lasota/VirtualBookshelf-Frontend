import {
  DialogActions,
  DialogActionsProps,
  SxProps,
  Theme,
} from "@mui/material";
import { mergeSx } from "../../utils";

const dialogActionsSx: SxProps<Theme> = (theme) => ({
  backgroundColor: theme.palette.background.default,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2, 2),
});

export default function CommonDialogActions({
  sx,
  ...props
}: DialogActionsProps) {
  return <DialogActions sx={mergeSx(dialogActionsSx, sx)} {...props} />;
}
