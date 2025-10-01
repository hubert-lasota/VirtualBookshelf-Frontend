import { ChallengeType } from "../../../../../common/models/challengeModels";
import { Chip } from "@mui/material";
import { useChallengeContext } from "../../../ChallengeContext";
import { useUserContext } from "../../../../../common/auth/UserContext";

export default function ChallengeTypeBadge() {
  const { type } = useChallengeContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const label = (() => {
    switch (type) {
      case ChallengeType.BOOK_COUNT:
        return isPlLanguage ? "Ilość książek" : "Book count";
      case ChallengeType.GENRE_BOOKS:
        return isPlLanguage ? "Książek gatunku" : "Books by genre";
      case ChallengeType.PAGE_COUNT:
        return isPlLanguage ? "Ilość stron" : "Page count";
      case ChallengeType.AUTHOR_COUNT:
        return isPlLanguage ? "Ilość autrów" : "Author count";
      case ChallengeType.GENRE_COUNT:
        return isPlLanguage ? "Ilość gatunków" : "Genre count";
    }
  })();

  return <Chip label={label} />;
}
