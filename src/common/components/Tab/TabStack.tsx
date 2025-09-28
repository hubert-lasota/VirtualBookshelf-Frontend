import { SxProps, Tab, TabProps, Tabs, TabsProps, Theme } from "@mui/material";
import { mergeSx } from "../../utils";

type TabStackProps = {
  tabs: TabProps[];
  maxVisibleTabs: number;
} & TabsProps;

const tabsSx: SxProps<Theme> = (theme) => ({
  width: "100%",
  backgroundColor: theme.palette.background.secondary,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  minHeight: "48px",
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTabs-scrollButtons": {
    color: theme.palette.primary.main,
    "&.Mui-disabled": {
      opacity: 0.3,
    },
  },
  "& .MuiTabs-scroller": {
    "& .MuiTabs-flexContainer": {
      gap: "1px",
    },
  },
  "& .MuiTabs-flexContainer": {
    width: "100%",
  },
});

const tabSx: SxProps<Theme> = (theme) => ({
  textTransform: "none",
  fontWeight: 500,
  fontSize: "14px",
  minHeight: "40px",
  minWidth: "120px",
  padding: theme.spacing(1, 3),
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.secondary,
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.primary["50"],
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
  },
});

export default function TabStack({
  tabs,
  maxVisibleTabs,
  sx,
  ...props
}: TabStackProps) {
  const needsScrolling = tabs.length > maxVisibleTabs;
  const visibleTabs = needsScrolling ? maxVisibleTabs : tabs.length;

  return (
    <Tabs
      variant={needsScrolling ? "scrollable" : "fullWidth"}
      scrollButtons={needsScrolling ? "auto" : false}
      allowScrollButtonsMobile={needsScrolling}
      sx={mergeSx(tabsSx, sx)}
      {...props}
    >
      {tabs.map(({ sx, ...tab }) => (
        <Tab
          disableRipple
          {...tab}
          sx={mergeSx(
            tabSx,
            {
              flex: `0 0 calc(${100 / visibleTabs}% - 1px)`,
              maxWidth: `${100 / visibleTabs}%`,
            },
            sx,
          )}
        />
      ))}
    </Tabs>
  );
}
