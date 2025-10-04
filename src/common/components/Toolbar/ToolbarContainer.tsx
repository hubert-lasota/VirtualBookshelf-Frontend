import { Stack, StackProps, SxProps, Theme } from "@mui/material";
import { mergeSx } from "../../utils";

const toolbarSx: SxProps<Theme> = (theme) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.secondary,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
  overflowX: "auto",
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
});

export default function ToolbarContainer({
  children,
  sx,
  ...props
}: StackProps) {
  return (
    <Stack direction="row" spacing={2} sx={mergeSx(toolbarSx, sx)} {...props}>
      {children}
    </Stack>
  );
}
