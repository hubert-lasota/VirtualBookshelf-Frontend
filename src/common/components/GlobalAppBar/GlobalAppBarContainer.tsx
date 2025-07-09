import { ReactNode } from "react";
import {
  AppBar,
  AppBarProps,
  SxProps,
  Toolbar,
  ToolbarProps,
} from "@mui/material";
import { GLOBAL_APP_BAR_HEIGHT } from "./config";

type GlobalAppBarContainerProps = {
  sx?: SxProps;
  children: ReactNode;
  toolbarProps?: ToolbarProps;
} & Pick<AppBarProps, "position">;

export default function GlobalAppBarContainer({
  children,
  sx,
  toolbarProps,
}: GlobalAppBarContainerProps) {
  return (
    <AppBar
      elevation={0}
      sx={[
        (theme) => ({
          borderRadius: 0,
          paddingInline: theme.spacing(12),
          borderBottom: `1.5px solid ${theme.palette.divider}`,
          boxShadow: `0px 1px 6px 0px rgba(0, 0, 0, 0.1)`,
          height: GLOBAL_APP_BAR_HEIGHT,
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
