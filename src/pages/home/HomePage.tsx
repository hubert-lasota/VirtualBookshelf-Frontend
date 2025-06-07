import { PageContainer } from "../../common/components/styles.js";
import LoggedInGlobalAppBar from "../../common/components/global_app_bar/LoggedInGlobalAppBar";

export default function HomePage() {
  return (
    <PageContainer>
      <LoggedInGlobalAppBar />
    </PageContainer>
  );
}
