import { Stack, Tab, Tabs } from "@mui/material";
import GlobalAppBarContainer from "../../common/components/GlobalAppBar/GlobalAppBarContainer";
import AppLogo from "../../common/components/GlobalAppBar/AppLogo";
import SettingsButton from "../../common/components/GlobalAppBar/SettingsButton";
import AppPagesDropdown from "../../common/components/GlobalAppBar/AppPagesDropdown";
import { BookshelfView } from "./BookshelfPage";
import { useUserContext } from "../../common/auth/UserContext";

type BookshelfHeaderProps = {
  view: BookshelfView;
  onViewChange: (view: BookshelfView) => void;
};
export default function BookshelfHeader({
  view,
  onViewChange,
}: BookshelfHeaderProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const tabs = [
    {
      value: BookshelfView.BOOKSHELVES,
      label: isPlLanguage ? "Regały" : "Bookshelves",
    },
    {
      value: BookshelfView.STATISTICS,
      label: isPlLanguage ? "Statystyki" : "Statistics",
    },
    {
      value: BookshelfView.CHALLENGES,
      label: isPlLanguage ? "Wyzwania" : "Challenges",
    },
  ];

  return (
    <GlobalAppBarContainer>
      <AppLogo />
      <Tabs
        value={view}
        onChange={(_, newValue) => onViewChange(newValue as BookshelfView)}
      >
        {tabs.map(({ value, label }) => (
          <Tab key={value} value={value} label={label} />
        ))}
      </Tabs>
      <Stack direction="row" spacing={4} alignItems="center">
        <AppPagesDropdown />
        <SettingsButton />
      </Stack>
    </GlobalAppBarContainer>
  );
}
