import { useChallengeContext } from "../../../../ChallengeContext";
import { useUserContext } from "../../../../../../common/auth/UserContext";
import CommonDialogTitle from "../../../../../../common/components/Dialog/CommonDialogTitle";

export default function ParticipantsHeader() {
  const { title, totalParticipants } = useChallengeContext();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <CommonDialogTitle
      title={isPlLanguage ? "Uczestnicy wyzwania" : "Challenge participants"}
      subtitle={`${title} • ${totalParticipants}${isPlLanguage ? "uczestników" : "participants"}`}
      showDivider={false}
    />
  );
}
