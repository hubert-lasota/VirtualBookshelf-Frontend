import { ReactNode, useEffect, useRef, useState } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

export default function GlobalAppBarContainer({
  children,
}: {
  children: ReactNode;
}) {
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
        position="fixed"
        elevation={0}
        sx={(theme) => ({
          borderRadius: 0,
          borderBottom: `1.5px solid ${theme.palette.divider}`,
          boxShadow: `0px 1px 6px 0px rgba(0, 0, 0, 0.1)`,
        })}
        color="inherit"
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {children}
        </Toolbar>
      </AppBar>
      <Box sx={{ marginBottom: `${appBarHeight}px` }} />
    </>
  );
}
