import MoreActionsIconButton from "../../../../../../../common/components/Button/MoreActionsIconButton";
import { getDestructiveMenuItemProps } from "../../../../../../../common/utils";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useUserContext } from "../../../../../../../common/auth/UserContext";
import { Pencil } from "lucide-react";
import { useState } from "react";
import DeleteSessionDialog from "./DeleteSessionDialog";
import { useManageSessionsContext } from "../ManageSessionsContext";
import { useReadingSessionContext } from "./ReadingSessionContext";

export default function SessionActionsButton() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { onEditSession } = useManageSessionsContext();
  const session = useReadingSessionContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const items = [
    {
      text: isPlLanguage ? "Edytuj" : "Edit",
      icon: <Pencil />,
      onClick: () => onEditSession(session),
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
      <MoreActionsIconButton items={items} />
      <DeleteSessionDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      />
    </>
  );
}
