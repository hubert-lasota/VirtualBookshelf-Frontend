import React, { ReactNode, useState } from "react";
import {
  IconButton,
  IconButtonProps,
  ListItemIcon,
  ListItemIconProps,
  ListItemText,
  ListItemTextProps,
  Menu,
  MenuItem,
  MenuItemProps,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useUserContext } from "../../auth/UserContext";

export type MoreActionsButtonItem = {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  text: string;
  icon: ReactNode;
  props?: MenuItemProps;
  iconProps?: ListItemIconProps;
  textProps?: ListItemTextProps;
};

type MoreActionsButtonProps = {
  items: MoreActionsButtonItem[];
  iconButtonProps?: IconButtonProps;
};

export default function MoreActionsButton({
  items,
  iconButtonProps = {},
}: MoreActionsButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <>
      <Tooltip title={isPlLanguage ? "Więcej akcji" : "More actions"}>
        <IconButton
          {...iconButtonProps}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      >
        {items.map(({ text, icon, onClick, props, iconProps, textProps }) => (
          <MenuItem
            onClick={(e) => {
              onClick(e);
              setAnchorEl(null);
            }}
            {...props}
          >
            <ListItemIcon {...iconProps}>{icon}</ListItemIcon>
            <ListItemText {...textProps}>{text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
