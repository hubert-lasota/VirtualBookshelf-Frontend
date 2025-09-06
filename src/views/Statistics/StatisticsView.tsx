import ViewContainer from "../ViewLayout/ViewContainer";
import ViewTitle from "../ViewLayout/ViewTitle";
import { useUserContext } from "../../common/auth/UserContext";
import ViewSubtitle from "../ViewLayout/ViewSubtitle";
import StatGrid from "./StatGrid";
import TabList from "./TabList";
import { useState } from "react";
import { StatTab } from "./models";
import MonthlyProgressTabView from "./MonthlyProgressTabView";
import GenreTabView from "./GenreTabView";
import BookLengthTabView from "./BookLengthTabView";

export default function StatisticsView() {
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
    <ViewContainer spacing={3}>
      <div>
        <ViewTitle>
          {isPlLanguage ? "Statystyki czytelnicze" : "Reading statistics"}
        </ViewTitle>
        <ViewSubtitle>
          {isPlLanguage
            ? "Przeglądaj swoje statystyki i analizuj postępy w czytaniu"
            : "View your statistics and analyze your reading progress"}
        </ViewSubtitle>
      </div>
      <StatGrid />
      <TabList tab={tab} onTabChange={setTab} />
      {renderTabView()}
    </ViewContainer>
  );
}
