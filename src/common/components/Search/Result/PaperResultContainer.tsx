import { Paper, PaperProps } from "@mui/material";

export default function PaperResultContainer({
  children,
  ...rest
}: PaperProps) {
  return (
    <Paper
      variant="outlined"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1),
        width: "100%",
        height: "100%",
        cursor: "pointer",
        transition: "background-color 0.1s ease",
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      })}
      {...rest}
    >
      {children}
    </Paper>
  );
}
