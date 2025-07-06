import BookshelfHeader from "./BookshelfHeader";
import { useState } from "react";
import { Stack } from "@mui/material";
import { GLOBAL_APP_BAR_HEIGHT } from "../../common/components/GlobalAppBar/config";
import BookshelvesView from "./BookshelvesView/BookshelvesView";
import PageContainer from "../../common/components/ui/layout/PageContainer";
import StatisticsView from "./StatisticsView/StatisticsView";
import ChallengesView from "./ChallengesView/ChallengesView";

export enum BookshelfView {
  BOOKSHELVES = "BOOKSHELVES",
  STATISTICS = "STATISTICS",
  CHALLENGES = "CHALLENGES",
}

export default function BookshelfPage() {
  const [view, setView] = useState<BookshelfView>(BookshelfView.BOOKSHELVES);

  const renderView = () => {
    switch (view) {
      case BookshelfView.BOOKSHELVES:
        return <BookshelvesView />;
      case BookshelfView.STATISTICS:
        return <StatisticsView />;
      case BookshelfView.CHALLENGES:
        return <ChallengesView />;
    }
  };

  return (
    <PageContainer>
      <BookshelfHeader view={view} onViewChange={(view) => setView(view)} />
      <Stack
        direction="row"
        sx={{
          width: "100%",
          height: "100%",
          paddingTop: GLOBAL_APP_BAR_HEIGHT,
        }}
      >
        {renderView()}
      </Stack>
    </PageContainer>
  );
}
