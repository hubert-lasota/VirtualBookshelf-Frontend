import { ReactNode } from "react";
import { Typography } from "@mui/material";

type ViewTitleProps = {
  children: ReactNode;
};
export default function ViewTitle({ children }: ViewTitleProps) {
  return (
    <Typography fontSize="30px" fontWeight={600} color="textPrimary">
      {children}
    </Typography>
  );
}
