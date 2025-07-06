import React, { ReactNode, useState } from "react";
import {
  IconButton,
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
};

export default function MoreActionsButton({ items }: MoreActionsButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <>
      <Tooltip title={isPlLanguage ? "Więcej akcji" : "More actions"}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
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
