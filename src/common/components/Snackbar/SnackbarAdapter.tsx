import { Alert } from "@mui/material";
import { CustomContentProps } from "notistack";
import { forwardRef } from "react";

const SnackbarAdapter = forwardRef<HTMLDivElement, CustomContentProps>(
  function SnackbarAdapter({ message, variant }, ref) {
    return (
      <Alert
        ref={ref}
        severity={variant === "default" ? "info" : variant}
        variant="filled"
        elevation={6}
      >
        {message}
      </Alert>
    );
  },
);

export default SnackbarAdapter;
