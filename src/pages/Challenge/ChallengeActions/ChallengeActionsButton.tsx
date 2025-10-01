import { useUserContext } from "../../../common/auth/UserContext";
import ChallengeFormDialog from "./ChallengeForm/ChallengeFormDialog";
import { useState } from "react";
import MoreActionsButton from "../../../common/components/Button/MoreActionsButton";
import { ActionItem } from "../../../common/components/Button/types";
import { Plus } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import JoinChallengeDialog from "./JoinChallenge/JoinChallengeDialog";

export default function ChallengeActionsButton() {
  const [openDialogs, setOpenDialogs] = useState({
    createChallenge: false,
    joinChallenge: false,
  });

  const handleOpenDialog = (key: keyof typeof openDialogs, open: boolean) =>
    setOpenDialogs((prev) => ({ ...prev, [key]: open }));

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const items: ActionItem[] = [
    {
      text: isPlLanguage ? "Dodaj wyzwanie" : "Add challenge",
      icon: <Plus />,
      onClick: () => handleOpenDialog("createChallenge", true),
    },
    {
      text: isPlLanguage ? "Dołącz do wyzwania" : "Join to challenge",
      icon: <SearchIcon />,
      onClick: () => handleOpenDialog("joinChallenge", true),
    },
  ];

  return (
    <>
      <MoreActionsButton items={items} />
      {openDialogs.createChallenge && (
        <ChallengeFormDialog
          onClose={() => handleOpenDialog("createChallenge", false)}
        />
      )}
      {openDialogs.joinChallenge && (
        <JoinChallengeDialog
          onClose={() => handleOpenDialog("joinChallenge", false)}
        />
      )}
    </>
  );
}
