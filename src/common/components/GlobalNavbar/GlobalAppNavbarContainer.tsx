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
// TODO powinien być position: sticky, aby elementy pod spodem nie musialy uzywac margin-top, to jest GLobalNavBar, a nie app bar
// + zawsze powinien mieć logo z lewej strony, zostawić tam to zawsze, jedynie przerzucać logoNavigateTo
export default function GlobalAppNavbarContainer({
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
