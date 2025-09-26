import ReadingSessionHeader from "./ReadingSessionHeader";
import ReadingSessionToolbar from "./ReadingSessionToolbar";
import LoggedInPageContainer from "../LoggedInLayout/LoggedInPageContainer";
import ReadingSessionGrid from "./ReadingSessionGrid/ReadingSessionGrid";

export default function ReadingSessionPage() {
  return (
    <LoggedInPageContainer spacing={3}>
      <ReadingSessionHeader />
      <ReadingSessionToolbar />
      <ReadingSessionGrid />
    </LoggedInPageContainer>
  );
}
