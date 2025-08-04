import React, { ReactNode, useState } from "react";
import {
  IconButton,
  IconButtonProps,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useUserContext } from "../../../auth/UserContext";

type MoreActionsButtonProps = {
  items: {
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    text: string;
    icon: ReactNode;
  }[];
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
        {items.map(({ text, icon, onClick }) => (
          <MenuItem
            onClick={(e) => {
              onClick(e);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
