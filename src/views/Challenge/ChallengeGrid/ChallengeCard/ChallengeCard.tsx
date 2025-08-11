import { ChallengeResponse } from "../../../../common/models/challengeModels";
import { Paper, Stack, Typography } from "@mui/material";
import { ChallengeContext } from "./ChallengeContext";
import ChallengeCardHeader from "./ChallengeCardHeader";
import ChallengeCardFooter from "./ChallengeCardFooter";
import StatusBadge from "./StatusBadge";
import { useUserContext } from "../../../../common/auth/UserContext";
import ChallengeAuthorBadge from "./ChallengeAuthorBadge";
import ChallengeProgress from "./ChallengeProgress";

type ChallengeCardProps = {
  challenge: ChallengeResponse;
};

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const { user } = useUserContext();
  return (
    <ChallengeContext.Provider value={challenge}>
      <Stack
        component={Paper}
        variant="outlined"
        spacing={2}
        sx={(theme) => ({
          padding: theme.spacing(3),
          borderRadius: theme.shape.borderRadius,
        })}
      >
        <Stack spacing={0.5}>
          <ChallengeCardHeader />
          <Stack direction="row" spacing={1}>
            <StatusBadge />
            {challenge.user.id === user.id && <ChallengeAuthorBadge />}
          </Stack>
        </Stack>
        <Typography variant="body1" color="textSecondary">
          {challenge.description}
        </Typography>
        <ChallengeProgress />
        <ChallengeCardFooter />
      </Stack>
    </ChallengeContext.Provider>
  );
}
