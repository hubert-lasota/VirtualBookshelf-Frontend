import { Outlet } from "react-router-dom";
import PageContainer from "../../common/components/ui/layout/PageContainer";
import NavSidebar from "./NavSidebar";

export default function LoggedInPageLayout() {
  return (
    <PageContainer
      sx={{
        display: "grid",
        gridTemplateColumns: "300px 1fr",
      }}
    >
      <NavSidebar />
      <Outlet />
    </PageContainer>
  );
}
