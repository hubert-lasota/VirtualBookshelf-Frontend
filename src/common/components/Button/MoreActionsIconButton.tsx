import { useState } from "react";
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
import { useUserContext } from "../../auth/UserContext";
import { ActionItem } from "./types";

type Props = {
  items: ActionItem[];
  iconButtonProps?: IconButtonProps;
};

export default function MoreActionsIconButton({
  items,
  iconButtonProps = {},
}: Props) {
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
