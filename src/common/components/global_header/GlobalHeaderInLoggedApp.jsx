import GlobalHeaderContainer from "./GlobalHeaderContainer.jsx";
import AppLogo from "../global_app_bar/AppLogo.jsx";
import HeaderRightSide from "./HeaderRightSide.jsx";

export default function GlobalHeaderInLoggedApp() {
  return (
    <GlobalHeaderContainer>
      <AppLogo />
      <HeaderRightSide />
    </GlobalHeaderContainer>
  );
}
