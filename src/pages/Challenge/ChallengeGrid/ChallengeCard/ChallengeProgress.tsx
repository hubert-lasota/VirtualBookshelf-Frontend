import { useUserContext } from "../../../../common/auth/UserContext";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { useChallengeContext } from "../../ChallengeContext";
import { ChallengeType } from "../../../../common/models/challengeModels";

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
    <Stack sx={{ width: "100%" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" color="textSecondary">
          {isPlLanguage ? "Postęp " : "Progress "}
          {progressPercentage}
          {"%"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {currentGoalValue}
          {" / "}
          {goalValue}
          {" " + getChallengeTypeLabel(type, isPlLanguage)}
        </Typography>
      </Stack>
      <LinearProgress
        value={progressPercentage}
        variant="determinate"
        sx={{ borderRadius: "6px" }}
      />
    </Stack>
  );
}
