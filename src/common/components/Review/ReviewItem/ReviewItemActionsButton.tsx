import { useState } from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useUserContext } from "../../../auth/UserContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteReviewDialog from "./DeleteReviewDialog";

type ReviewItemActionsButtonProps = {
  onEdit: () => void;
};

export default function ReviewItemActionsButton({
  onEdit,
}: ReviewItemActionsButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const items = [
    {
      text: isPlLanguage ? "Edytuj" : "Edit",
      icon: <EditIcon />,
      onClick: onEdit,
    },
    {
      text: isPlLanguage ? "Usuń" : "Delete",
      icon: <DeleteIcon />,
      onClick: () => setOpenDeleteDialog(true),
    },
  ];

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      >
        {items.map(({ text, icon, onClick }) => (
          <MenuItem onClick={onClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      <DeleteReviewDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      />
    </>
  );
}
