import { StatTab } from "./models";
import { useUserContext } from "../../common/auth/UserContext";
import TabStack from "../../common/components/Tab/TabStack";

type TabListProps = {
  tab: StatTab;
  onTabChange: (tab: StatTab) => void;
};

export default function StatisticsTabs({ tab, onTabChange }: TabListProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const tabs = [
    {
      value: StatTab.PROGRESS,
      label: isPlLanguage ? "Postęp miesięczny" : "Monthly progress",
    },
    {
      value: StatTab.GENRE,
      label: isPlLanguage ? "Gatunki" : "Genres",
    },
    {
      value: StatTab.BOOK_LENGTH,
      label: isPlLanguage ? "Długość książek" : "Book length",
    },
  ];

  return (
    <TabStack
      tabs={tabs}
      maxVisibleTabs={tabs.length}
      value={tab}
      onChange={(_e, tab) => onTabChange(tab)}
    />
  );
}
