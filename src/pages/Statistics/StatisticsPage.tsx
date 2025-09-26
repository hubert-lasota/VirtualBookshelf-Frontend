import LoggedInPageContainer from "../LoggedInLayout/LoggedInPageContainer";
import LoggedInPageTitle from "../LoggedInLayout/LoggedInPageTitle";
import { useUserContext } from "../../common/auth/UserContext";
import LoggedInPageSubtitle from "../LoggedInLayout/LoggedInPageSubtitle";
import StatGrid from "./StatGrid";
import TabList from "./TabList";
import { useState } from "react";
import { StatTab } from "./models";
import MonthlyProgressTabView from "./MonthlyProgressTabView";
import GenreTabView from "./GenreTabView";
import BookLengthTabView from "./BookLengthTabView";

export default function StatisticsPage() {
  const [tab, setTab] = useState<StatTab>(StatTab.PROGRESS);
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const renderTabView = () => {
    switch (tab) {
      case StatTab.PROGRESS:
        return <MonthlyProgressTabView />;
      case StatTab.GENRE:
        return <GenreTabView />;
      case StatTab.BOOK_LENGTH:
        return <BookLengthTabView />;
    }
  };

  return (
    <LoggedInPageContainer spacing={3}>
      <div>
        <LoggedInPageTitle>
          {isPlLanguage ? "Statystyki czytelnicze" : "Reading statistics"}
        </LoggedInPageTitle>
        <LoggedInPageSubtitle>
          {isPlLanguage
            ? "Przeglądaj swoje statystyki i analizuj postępy w czytaniu"
            : "View your statistics and analyze your reading progress"}
        </LoggedInPageSubtitle>
      </div>
      <StatGrid />
      <TabList tab={tab} onTabChange={setTab} />
      {renderTabView()}
    </LoggedInPageContainer>
  );
}
