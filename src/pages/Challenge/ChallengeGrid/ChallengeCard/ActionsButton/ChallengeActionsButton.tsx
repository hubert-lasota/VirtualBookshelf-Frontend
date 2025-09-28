import MoreActionsButton from "../../../../../common/components/Button/MoreActionsButton";
import { useUserContext } from "../../../../../common/auth/UserContext";
import { Pencil, UserRoundX } from "lucide-react";
import { useState } from "react";
import QuitChallengeDialog from "./QuitChallengeDialog";
import { useChallengeContext } from "../ChallengeContext";
import ChallengeFormDialog from "../../../ChallengeForm/ChallengeFormDialog";

export default function ChallengeActionsButton() {
  const [openQuitChallenge, setOpenQuitChallenge] = useState(false);
  const [openFormChallenge, setOpenFormChallenge] = useState(false);

  const challenge = useChallengeContext();

  const {
    preferences: { isPlLanguage },
    user,
  } = useUserContext();

  let items = [
    {
      text: isPlLanguage ? "Zrezygnuj" : "Quit challenge",
      icon: <UserRoundX />,
      onClick: () => setOpenQuitChallenge(true),
    },
  ];

  if (user.id === challenge.user.id) {
    items = [
      {
        text: isPlLanguage ? "Edytuj" : "Edit",
        icon: <Pencil />,
        onClick: () => setOpenFormChallenge(true),
      },
      ...items,
    ];
  }

  return (
    <>
      <MoreActionsButton items={items} iconButtonProps={{ size: "small" }} />
      <QuitChallengeDialog
        open={openQuitChallenge}
        onClose={() => setOpenQuitChallenge(false)}
      />
      <ChallengeFormDialog
        open={openFormChallenge}
        onClose={() => setOpenFormChallenge(false)}
        challenge={challenge}
      />
    </>
  );
}
