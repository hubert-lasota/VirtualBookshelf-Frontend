import MoreActionsButton from "../../../../../../../common/components/Button/MoreActionsButton";
import { useState } from "react";
import { useUserContext } from "../../../../../../../common/auth/UserContext";
import DeleteNoteDialog from "./DeleteNoteDialog";
import { useNoteContext } from "./NoteContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Pencil } from "lucide-react";
import { getDestructiveMenuItemProps } from "../../../../../../../common/utils";

export default function NoteActionsButton() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { onEdit } = useNoteContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const items = [
    {
      text: isPlLanguage ? "Edytuj" : "Edit",
      icon: <Pencil />,
      onClick: onEdit,
    },
    {
      text: isPlLanguage ? "Usuń" : "Delete",
      icon: <DeleteOutlineIcon />,
      onClick: () => setOpenDeleteDialog(true),
      ...getDestructiveMenuItemProps(),
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
