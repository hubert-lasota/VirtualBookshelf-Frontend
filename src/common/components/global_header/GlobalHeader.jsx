import css from "./global-header.module.css";
import AppLogo from "../app_logo/AppLogo.jsx";
import HeaderRightSide from "./HeaderRightSide.jsx";

export default function GlobalHeader({ rightSideComponent = null }) {
  const RightSideComponent = rightSideComponent || <HeaderRightSide />;
  return (
    <header className={css["header"]}>
      <AppLogo />
      <RightSideComponent />
    </header>
  );
}
