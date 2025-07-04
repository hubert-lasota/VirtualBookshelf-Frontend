import { Box, BoxProps, CircularProgress, Stack } from "@mui/material";

type PageContainerProps = BoxProps & {
  isLoading?: boolean;
};

export default function PageContainer({
  children,
  sx,
  isLoading = false,
  ...props
}: PageContainerProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          height: "100dvh",
          width: "100%",
          backgroundImage: theme.palette.background.defaultGradient,
          backgroundRepeat: "no-repeat",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {isLoading ? (
        <Stack
          spacing={3}
          sx={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10rem",
          }}
        >
          <CircularProgress color="primary" size="5rem" />
        </Stack>
      ) : (
        children
      )}
    </Box>
  );
}
