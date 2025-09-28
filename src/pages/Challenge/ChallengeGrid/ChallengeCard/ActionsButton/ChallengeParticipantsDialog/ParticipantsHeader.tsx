import { useChallengeContext } from "../../ChallengeContext";
import { useUserContext } from "../../../../../../common/auth/UserContext";
import CommonDialogTitle from "../../../../../../common/components/Dialog/CommonDialogTitle";

type Props = {
  onClose: () => void;
};

export default function ParticipantsHeader({ onClose }: Props) {
  const { title, totalParticipants } = useChallengeContext();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <CommonDialogTitle
      onClose={onClose}
      title={isPlLanguage ? "Uczestnicy wyzwania" : "Challenge participants"}
      subtitle={`${title} • ${totalParticipants}${isPlLanguage ? "uczestników" : "participants"}`}
      showDivider={false}
    />
  );
}
