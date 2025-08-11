import MoreActionsButton from "../../../../../common/components/ui/Button/MoreActionsButton";
import { useUserContext } from "../../../../../common/auth/UserContext";
import { UserRoundX } from "lucide-react";
import { useState } from "react";
import QuitChallengeDialog from "./QuitChallengeDialog";

export default function ChallengeActionsButton() {
  const [openQuitChallenge, setOpenQuitChallenge] = useState(false);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const items = [
    {
      text: isPlLanguage ? "Zrezygnuj" : "Quit challenge",
      icon: <UserRoundX />,
      onClick: () => setOpenQuitChallenge(true),
    },
  ];

  return (
    <>
      <MoreActionsButton items={items} iconButtonProps={{ size: "small" }} />
      <QuitChallengeDialog
        open={openQuitChallenge}
        onClose={() => setOpenQuitChallenge(false)}
      />
    </>
  );
}
