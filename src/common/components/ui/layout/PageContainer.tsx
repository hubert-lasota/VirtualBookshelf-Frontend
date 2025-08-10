import { Box, BoxProps, SxProps, Theme } from "@mui/material";
import { mergeSx } from "../../../utils";

const pageContainerSx: SxProps<Theme> = (theme) => ({
  height: "100dvh",
  width: "100%",
  backgroundColor: theme.palette.background.default,
  overflow: "auto",
});

export default function PageContainer({ children, sx, ...props }: BoxProps) {
  return (
    <Box sx={mergeSx(pageContainerSx, sx)} {...props}>
      {children}
    </Box>
  );
}
