import { ReactNode, useEffect, useRef, useState } from "react";
import {
  AppBar,
  AppBarProps,
  Box,
  SxProps,
  Toolbar,
  ToolbarProps,
} from "@mui/material";

type GlobalAppBarContainerProps = {
  sx?: SxProps;
  children: ReactNode;
  toolbarProps?: ToolbarProps;
} & Pick<AppBarProps, "position">;

export default function GlobalAppBarContainer({
  children,
  sx,
  toolbarProps,
  position = "fixed",
}: GlobalAppBarContainerProps) {
  const appBarRef = useRef<HTMLDivElement>(null);
  const [appBarHeight, setAppBarHeight] = useState(0);

  // @ts-ignore
  useEffect(() => {
    if (appBarRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        setAppBarHeight(appBarRef.current!.offsetHeight);
      });

      resizeObserver.observe(appBarRef.current);

      setAppBarHeight(appBarRef.current.offsetHeight);

      return () => resizeObserver.disconnect();
    }
  }, [appBarRef]);

  return (
    <>
      <AppBar
        ref={appBarRef}
        position={position}
        elevation={0}
        sx={[
          (theme) => ({
            borderRadius: 0,
            paddingInline: theme.spacing(12),
            borderBottom: `1.5px solid ${theme.palette.divider}`,
            boxShadow: `0px 1px 6px 0px rgba(0, 0, 0, 0.1)`,
            maxHeight: "70px",
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
      {position !== "static" && (
        <Box sx={{ marginBottom: `${appBarHeight}px` }} />
      )}
    </>
  );
}
