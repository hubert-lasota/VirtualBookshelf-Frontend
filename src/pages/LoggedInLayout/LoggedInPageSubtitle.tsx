import { Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function LoggedInPageSubtitle({ children }: Props) {
  return (
    <Typography variant="subtitle1" color="textSecondary">
      {children}
    </Typography>
  );
}
