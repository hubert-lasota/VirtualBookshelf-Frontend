import MoreActionsButton, {
  MoreActionsButtonItem,
} from "../../../../../common/components/Button/MoreActionsButton";
import { useUserContext } from "../../../../../common/auth/UserContext";
import { Pencil, UserRoundX, Users } from "lucide-react";
import { useState } from "react";
import QuitChallengeDialog from "./QuitChallengeDialog";
import { useChallengeContext } from "../ChallengeContext";
import ChallengeFormDialog from "../../../ChallengeForm/ChallengeFormDialog";
import { getDestructiveMenuItemProps } from "../../../../../common/utils";
import ChallengeParticipantsDialog from "./ChallengeParticipantsDialog/ChallengeParticipantsDialog";

export default function ChallengeActionsButton() {
  const [openDialogs, setOpenDialogs] = useState({
    challengeForm: false,
    quitChallenge: false,
    participants: false,
  });

  const handleChangeOpenDialogs = (
    key: keyof typeof openDialogs,
    open: boolean,
  ) => setOpenDialogs((prev) => ({ ...prev, [key]: open }));

  const challenge = useChallengeContext();

  const {
    preferences: { isPlLanguage },
    user,
  } = useUserContext();

  let items: MoreActionsButtonItem[] = [
    {
      text: isPlLanguage ? "Uczestnicy" : "Participants",
      icon: <Users />,
      onClick: () => handleChangeOpenDialogs("participants", true),
      props: {
        divider: true,
      },
    },
    {
      text: isPlLanguage ? "Zrezygnuj" : "Quit challenge",
      icon: <UserRoundX />,
      onClick: () => handleChangeOpenDialogs("quitChallenge", true),
      ...getDestructiveMenuItemProps(),
    },
  ];

  if (user.id === challenge.user.id) {
    items = [
      {
        text: isPlLanguage ? "Edytuj" : "Edit",
        icon: <Pencil />,
        onClick: () => handleChangeOpenDialogs("challengeForm", true),
      },
      ...items,
    ];
  }

  return (
    <>
      <MoreActionsButton items={items} iconButtonProps={{ size: "small" }} />
      <QuitChallengeDialog
        open={openDialogs.quitChallenge}
        onClose={() => handleChangeOpenDialogs("quitChallenge", false)}
      />
      <ChallengeFormDialog
        open={openDialogs.challengeForm}
        onClose={() => handleChangeOpenDialogs("challengeForm", false)}
        challenge={challenge}
      />
      <ChallengeParticipantsDialog
        open={openDialogs.participants}
        onClose={() => handleChangeOpenDialogs("participants", false)}
      />
    </>
  );
}
