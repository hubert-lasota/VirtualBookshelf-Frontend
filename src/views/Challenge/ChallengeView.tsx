import ChallengeHeader from "./ChallengeHeader/ChallengeHeader";

import ChallengeToolbar from "./ChallengeToolbar";
import ChallengeGrid from "./ChallengeGrid/ChallengeGrid";
import ViewContainer from "../../common/components/ui/View/ViewContainer";

export default function ChallengeView() {
  return (
    <ViewContainer spacing={3}>
      <ChallengeHeader />
      <ChallengeToolbar />
      <ChallengeGrid />
    </ViewContainer>
  );
}
