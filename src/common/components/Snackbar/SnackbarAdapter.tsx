import { Alert } from "@mui/material";
import { CustomContentProps } from "notistack";
import { forwardRef } from "react";

const SnackbarAdapter = forwardRef<HTMLDivElement, CustomContentProps>(
  function SnackbarAdapter({ message, variant }, ref) {
    const severity = variant === "default" ? "info" : variant;
    return (
      <Alert
        ref={ref}
        severity={severity}
        variant="filled"
        elevation={6}
        color={severity}
      >
        {message}
      </Alert>
    );
  },
);

export default SnackbarAdapter;
