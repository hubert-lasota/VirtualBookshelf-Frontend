import { ReactNode } from "react";
import { Typography } from "@mui/material";

type Props = {
  children: ReactNode;
};
export default function LoggedInPageTitle({ children }: Props) {
  return (
    <Typography fontSize="30px" fontWeight={600} color="textPrimary">
      {children}
    </Typography>
  );
}
