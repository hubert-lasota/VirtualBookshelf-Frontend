import {
  ChallengeResponse,
  ChallengeType,
} from "../../common/models/challengeModels";
import { Calendar as CalendarIcon, Users as UsersIcon } from "lucide-react";

export const getChallengeTypeMenuItems = (isPlLanguage: boolean) => [
  {
    value: ChallengeType.BOOK_COUNT,
    label: isPlLanguage ? "Ilość książek" : "Number of books",
  },
  {
    value: ChallengeType.PAGE_COUNT,
    label: isPlLanguage ? "Ilość stron" : "Number of pages",
  },
  {
    value: ChallengeType.GENRE_COUNT,
    label: isPlLanguage
      ? "Ilość różnych gatunków"
      : "Number of different genres",
  },
  {
    value: ChallengeType.GENRE_BOOKS,
    label: isPlLanguage
      ? "Ilość książek konkretnego gatunku"
      : "Number of books of specific genre",
  },
  {
    value: ChallengeType.AUTHOR_COUNT,
    label: isPlLanguage
      ? "Ilość książek różnych autorów"
      : "Number of books of different authors",
  },
];

export const getChallengeInfoItems = ({
  durationRange,
  totalParticipants,
}: ChallengeResponse) => [
  {
    icon: CalendarIcon,
    text:
      new Date(durationRange.startAt).toLocaleDateString() +
      " - " +
      new Date(durationRange.endAt).toLocaleDateString(),
  },
  {
    icon: UsersIcon,
    text: totalParticipants,
  },
];
