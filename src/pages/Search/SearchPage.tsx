import LoggedInPageContainer from "../LoggedInLayout/LoggedInPageContainer";
import { useUserContext } from "../../common/auth/UserContext";
import LoggedInPageTitle from "../LoggedInLayout/LoggedInPageTitle";
import { useState } from "react";
import { ResourceType } from "./models";
import { useGetBooks } from "../../common/api/clients/bookClient";
import ResourceGrid from "./ResourceGrid";
import SearchToolbar from "./SearchToolbar";
import { SearchPageContext } from "./SearchPageContext";
import { BookFilter } from "../../common/models/bookModels";

export default function SearchPage() {
  const [bookFilter, setBookFilter] = useState<BookFilter>({});
  const [query, setQuery] = useState("");
  const [resourceType, setResourceType] = useState<ResourceType>("book");

  const { data: { books = [] } = {} } = useGetBooks({
    page: 0,
    size: 10,
    ...bookFilter,
    query,
    enabled: resourceType === "book" && !!query,
  });

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <SearchPageContext.Provider
      value={{
        resourceType,
        onResourceTypeChange: setResourceType,
        query,
        onQueryChange: setQuery,
        books,
        authors: [],
        users: [],
        bookFilter,
        onBookFilterChange: setBookFilter,
      }}
    >
      <LoggedInPageContainer spacing={3}>
        <LoggedInPageTitle>
          {isPlLanguage
            ? "Szukaj książek, autorów oraz użytkowników"
            : "Search books, authors and users"}
        </LoggedInPageTitle>
        <SearchToolbar />
        <ResourceGrid />
      </LoggedInPageContainer>
    </SearchPageContext.Provider>
  );
}
