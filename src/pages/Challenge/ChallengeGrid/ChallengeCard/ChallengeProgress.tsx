import { useUserContext } from "../../../../common/auth/UserContext";
import { useChallengeContext } from "../../ChallengeContext";
import { ChallengeType } from "../../../../common/models/challengeModels";
import CommonLinearProgress from "../../../../common/components/Progress/CommonLinearProgress";

const getChallengeTypeLabel = (type: ChallengeType, isPlLanguage: boolean) => {
  switch (type) {
    case ChallengeType.BOOK_COUNT:
      return isPlLanguage ? "książek" : "books";
    case ChallengeType.GENRE_BOOKS:
      return isPlLanguage ? "książek" : "books";
    case ChallengeType.PAGE_COUNT:
      return isPlLanguage ? "stron" : "pages";
    case ChallengeType.AUTHOR_COUNT:
      return isPlLanguage ? "autorów" : "authors";
    case ChallengeType.GENRE_COUNT:
      return isPlLanguage ? "gatunków" : "genres";
  }
};

export default function ChallengeProgress() {
  const {
    participation: { progressPercentage, currentGoalValue, participates },
    goalValue,
    type,
  } = useChallengeContext();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  if (!participates) {
    return null;
  }
  return (
    <CommonLinearProgress
      progressPercentage={progressPercentage}
      value={currentGoalValue}
      maxValue={goalValue}
      valueSuffix={" " + getChallengeTypeLabel(type, isPlLanguage)}
    />
  );
}
