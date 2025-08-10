import { ChallengeResponse } from "../../../../common/models/challengeModels";
import { Paper, Stack, Typography } from "@mui/material";
import ChallengeActionsButton from "./ChallengeActionsButton";
import { ChallengeContext } from "./ChallengeContext";

type ChallengeCardProps = {
  challenge: ChallengeResponse;
};
export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <ChallengeContext.Provider value={challenge}>
      <Stack component={Paper} spacing={1}>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="subtitle1" color="textPrimary">
            {challenge.title}
          </Typography>
          <ChallengeActionsButton />
        </Stack>
        <Typography variant="body1" color="textSecondary">
          {challenge.description}
        </Typography>
      </Stack>
    </ChallengeContext.Provider>
  );
}
