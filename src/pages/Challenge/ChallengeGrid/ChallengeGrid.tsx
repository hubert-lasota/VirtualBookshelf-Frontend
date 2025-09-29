import { Grid } from "@mui/material";
import ChallengeCard from "./ChallengeCard/ChallengeCard";
import { ChallengeResponse } from "../../../common/models/challengeModels";

type Props = {
  challenges: ChallengeResponse[];
};

export default function ChallengeGrid({ challenges }: Props) {
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
