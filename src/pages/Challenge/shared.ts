import { ChallengeResponse } from "../../common/models/challengeModels";
import { Calendar as CalendarIcon, Users as UsersIcon } from "lucide-react";

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
