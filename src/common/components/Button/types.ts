import React, { ReactNode } from "react";
import {
  ListItemIconProps,
  ListItemTextProps,
  MenuItemProps,
} from "@mui/material";

export type ActionItem = {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  text: string;
  icon: ReactNode;
  props?: MenuItemProps;
  iconProps?: ListItemIconProps;
  textProps?: ListItemTextProps;
};
