import ChallengeHeader from "./ChallengeHeader/ChallengeHeader";

import ChallengeToolbar from "./ChallengeToolbar";
import ChallengeGrid from "./ChallengeGrid/ChallengeGrid";
import LoggedInPageContainer from "../LoggedInLayout/LoggedInPageContainer";

export default function ChallengePage() {
  return (
    <LoggedInPageContainer spacing={3}>
      <ChallengeHeader />
      <ChallengeToolbar />
      <ChallengeGrid />
    </LoggedInPageContainer>
  );
}
