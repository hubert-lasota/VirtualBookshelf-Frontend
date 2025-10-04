import LoggedInPageContainer from "../LoggedInLayout/LoggedInPageContainer";
import RecommendedBooksCard from "./RecommendedBooksCard";
import RecommendedAuthorsCard from "./RecommendedAuthorsCard";
import RecommendedGenresCard from "./RecommendedGenresCard";
import { Stack } from "@mui/material";

export default function HomePage() {
  return (
    <LoggedInPageContainer>
      <Stack spacing={3}>
        <RecommendedBooksCard />
        <RecommendedAuthorsCard />
        <RecommendedGenresCard />
      </Stack>
    </LoggedInPageContainer>
  );
}
