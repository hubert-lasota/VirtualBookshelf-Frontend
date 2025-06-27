import { PageContainer } from "../../common/components/ui/styles.js";
import LoggedInGlobalAppBar from "../../common/components/GlobalAppBar/LoggedInGlobalAppBar";

export default function HomePage() {
  return (
    <PageContainer>
      <LoggedInGlobalAppBar />
    </PageContainer>
  );
}
