import { Stack, StackProps, SxProps, Theme } from "@mui/material";
import { mergeSx } from "../../../utils";

const viewContainerSx: SxProps<Theme> = (theme) => ({
  width: "100%",
  height: "100%",
  padding: theme.spacing(4),
});

export default function ViewContainer({ sx, ...props }: StackProps) {
  return <Stack sx={mergeSx(viewContainerSx, sx)} {...props} />;
}
