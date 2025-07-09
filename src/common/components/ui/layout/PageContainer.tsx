import { Box, BoxProps, CircularProgress, Stack } from "@mui/material";
import { GLOBAL_APP_BAR_HEIGHT } from "../../GlobalAppBar/config";

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
          height: `calc(100dvh - ${GLOBAL_APP_BAR_HEIGHT})`,
          width: "100%",
          backgroundImage: theme.palette.background.defaultGradient,
          backgroundRepeat: "no-repeat",
          marginTop: GLOBAL_APP_BAR_HEIGHT,
          overflow: "auto",
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
