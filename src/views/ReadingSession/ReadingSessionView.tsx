import ReadingSessionHeader from "./ReadingSessionHeader";
import ReadingSessionToolbar from "./ReadingSessionToolbar";
import ViewContainer from "../../common/components/ui/View/ViewContainer";
import ReadingSessionGrid from "./ReadingSessionGrid/ReadingSessionGrid";

export default function ReadingSessionView() {
  return (
    <ViewContainer spacing={3}>
      <ReadingSessionHeader />
      <ReadingSessionToolbar />
      <ReadingSessionGrid />
    </ViewContainer>
  );
}
