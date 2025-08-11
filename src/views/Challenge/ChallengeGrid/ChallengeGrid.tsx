import { useGetChallenges } from "../../../common/api/clients/challengeClient";
import { Grid } from "@mui/material";
import ChallengeCard from "./ChallengeCard/ChallengeCard";

export default function ChallengeGrid() {
  const { data: { challenges = [] } = {} } = useGetChallenges({
    participating: true,
  });

  return (
    <Grid container spacing={2}>
      {challenges.map((c) => (
        <Grid size={4}>
          <ChallengeCard challenge={c} />
        </Grid>
      ))}
    </Grid>
  );
}
