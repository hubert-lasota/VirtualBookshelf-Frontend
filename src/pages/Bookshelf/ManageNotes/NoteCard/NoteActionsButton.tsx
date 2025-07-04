import MoreActionsButton from "../../../../common/components/ui/Button/MoreActionsButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useUserContext } from "../../../../common/auth/UserContext";
import DeleteNoteDialog from "./DeleteNoteDialog";
import { useNoteContext } from "./NoteContext";
import EditIcon from "@mui/icons-material/Edit";

export default function NoteActionsButton() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { onEdit } = useNoteContext();

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
      <MoreActionsButton items={items} />
      <DeleteNoteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      />
    </>
  );
}
