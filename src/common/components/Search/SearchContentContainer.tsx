import { DialogContent } from "@mui/material";
import { ReactNode } from "react";

export default function SearchContentContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DialogContent
      dividers
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: theme.spacing(2),
        backgroundImage: theme.palette.background.defaultGradient,
      })}
    >
      {children}
    </DialogContent>
  );
}
