import GlobalAppBar from "./GlobalAppBar";
import { ReactNode } from "react";
import SettingsButton from "./SettingsButton";
import SearchButton from "../Search/SearchButton";
import AppPagesDropdown from "./AppPagesDropdown";

export default function LoggedInGlobalAppBar({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <GlobalAppBar>
      {children}
      <SearchButton />
      <AppPagesDropdown />
      <SettingsButton />
    </GlobalAppBar>
  );
}
