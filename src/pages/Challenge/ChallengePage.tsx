import ChallengeHeader from "./ChallengeHeader/ChallengeHeader";

import ChallengeToolbar from "./ChallengeToolbar/ChallengeToolbar";
import ChallengeGrid from "./ChallengeGrid/ChallengeGrid";
import LoggedInPageContainer from "../LoggedInLayout/LoggedInPageContainer";
import { useGetChallenges } from "../../common/api/clients/challengeClient";
import { useState } from "react";
import { ChallengeFilter } from "../../common/models/challengeModels";

export default function ChallengePage() {
  const [filter, setFilter] = useState<ChallengeFilter>({
    participating: true,
  });
  const { data: { challenges = [] } = {} } = useGetChallenges(filter);
  return (
    <LoggedInPageContainer spacing={3}>
      <ChallengeHeader />
      <ChallengeToolbar filter={filter} onFilterChange={setFilter} />
      <ChallengeGrid challenges={challenges} />
    </LoggedInPageContainer>
  );
}
