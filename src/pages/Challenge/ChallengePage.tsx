import ChallengeHeader from "./ChallengeHeader";

import ChallengeToolbar from "./ChallengeToolbar/ChallengeToolbar";
import ChallengeGrid from "./ChallengeGrid/ChallengeGrid";
import LoggedInPageContainer from "../LoggedInLayout/LoggedInPageContainer";
import { useGetChallenges } from "../../common/api/clients/challengeClient";
import { useState } from "react";
import { ChallengeFilter } from "../../common/models/challengeModels";
import { ChallengePageContext } from "./ChallengeContext";

export default function ChallengePage() {
  const [filter, setFilter] = useState<ChallengeFilter>({
    participating: true,
  });
  const { data: { challenges = [] } = {} } = useGetChallenges(filter);

  return (
    <ChallengePageContext.Provider
      value={{
        filter,
        onFilterChange: setFilter,
      }}
    >
      <LoggedInPageContainer spacing={3}>
        <ChallengeHeader />
        <ChallengeToolbar />
        <ChallengeGrid challenges={challenges} />
      </LoggedInPageContainer>
    </ChallengePageContext.Provider>
  );
}
