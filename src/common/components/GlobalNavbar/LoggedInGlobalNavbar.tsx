import GlobalNavbar from "./GlobalNavbar";
import { ReactNode } from "react";
import SettingsButton from "./SettingsButton";
import SearchButton from "../Search/SearchButton";
import AppPagesDropdown from "./AppPagesDropdown";

export default function LoggedInGlobalNavbar({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <GlobalNavbar>
      {children}
      <SearchButton />
      <AppPagesDropdown />
      <SettingsButton />
    </GlobalNavbar>
  );
}
