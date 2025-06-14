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
      })}
      {...rest}
    >
      {children}
    </Paper>
  );
}
