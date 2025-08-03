import { Box, BoxProps } from "@mui/material";

export default function PageContainer({ children, sx, ...props }: BoxProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          height: "100dvh",
          width: "100%",
          backgroundColor: theme.palette.background.default,
          overflow: "auto",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}
