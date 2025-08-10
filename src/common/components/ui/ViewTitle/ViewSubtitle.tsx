import { Typography } from "@mui/material";
import { ReactNode } from "react";

type ViewSubtitleProps = {
  children: ReactNode;
};

export default function ViewSubtitle({ children }: ViewSubtitleProps) {
  return (
    <Typography variant="subtitle1" color="textSecondary">
      {children}
    </Typography>
  );
}
