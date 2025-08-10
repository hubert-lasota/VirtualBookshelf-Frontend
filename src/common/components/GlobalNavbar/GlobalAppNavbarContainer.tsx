import { ReactNode } from "react";
import {
  AppBar,
  AppBarProps,
  SxProps,
  Toolbar,
  ToolbarProps,
} from "@mui/material";
import { GLOBAL_NAVBAR_HEIGHT } from "./config";

type GlobalAppBarContainerProps = {
  sx?: SxProps;
  children: ReactNode;
  toolbarProps?: ToolbarProps;
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
} & Pick<AppBarProps, "position">;

export default function GlobalAppNavbarContainer({
  children,
  sx,
  toolbarProps,
  position = "sticky",
}: GlobalAppBarContainerProps) {
  return (
    <AppBar
      elevation={0}
      position={position}
      sx={[
        (theme) => ({
          height: GLOBAL_NAVBAR_HEIGHT,
          borderRadius: 0,
          paddingInline: theme.spacing(12),
          borderBottom: `1.5px solid ${theme.palette.divider}`,
          boxShadow: `0px 1px 6px 0px rgba(0, 0, 0, 0.1)`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      color="inherit"
    >
      <Toolbar
        sx={{ justifyContent: "space-between", alignItems: "center" }}
        {...toolbarProps}
      >
        {children}
      </Toolbar>
    </AppBar>
  );
}
