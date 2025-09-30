import { Stack } from "@mui/material";
import ChallengeResultItem from "./ResultItem/ChallengeResultItem";
import { ChallengeResponse } from "../../../../common/models/challengeModels";
import { ChallengeContext } from "../../ChallengeContext";

type Props = { challenges: ChallengeResponse[] };

export default function ChallengeResult({ challenges }: Props) {
  return (
    <Stack spacing={2}>
      {challenges.map((challenge) => (
        <ChallengeContext.Provider value={challenge}>
          <ChallengeResultItem key={challenge.id} />
        </ChallengeContext.Provider>
      ))}
    </Stack>
  );
}
