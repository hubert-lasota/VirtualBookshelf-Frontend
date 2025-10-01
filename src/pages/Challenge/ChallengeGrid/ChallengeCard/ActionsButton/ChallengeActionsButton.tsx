import MoreActionsIconButton from "../../../../../common/components/Button/MoreActionsIconButton";
import { useUserContext } from "../../../../../common/auth/UserContext";
import { Pencil, UserRoundX, Users } from "lucide-react";
import { useState } from "react";
import QuitChallengeDialog from "./QuitChallengeDialog";
import { useChallengeContext } from "../../../ChallengeContext";
import ChallengeFormDialog from "../../../ChallengeActions/ChallengeForm/ChallengeFormDialog";
import { getDestructiveMenuItemProps } from "../../../../../common/utils";
import ChallengeParticipantsDialog from "./ChallengeParticipantsDialog/ChallengeParticipantsDialog";
import { ActionItem } from "../../../../../common/components/Button/types";

export default function ChallengeActionsButton() {
  const [openDialogs, setOpenDialogs] = useState({
    updateChallenge: false,
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

  let items: ActionItem[] = [
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
        onClick: () => handleChangeOpenDialogs("updateChallenge", true),
      },
      ...items,
    ];
  }

  return (
    <>
      <MoreActionsIconButton
        items={items}
        iconButtonProps={{ size: "small" }}
      />
      <QuitChallengeDialog
        open={openDialogs.quitChallenge}
        onClose={() => handleChangeOpenDialogs("quitChallenge", false)}
      />
      {openDialogs.updateChallenge && (
        <ChallengeFormDialog
          onClose={() => handleChangeOpenDialogs("updateChallenge", false)}
          challenge={challenge}
        />
      )}
      {openDialogs.participants && (
        <ChallengeParticipantsDialog
          onClose={() => handleChangeOpenDialogs("participants", false)}
        />
      )}
    </>
  );
}
