import LoggedInPageContainer from "../LoggedInLayout/LoggedInPageContainer";
import { useUserContext } from "../../common/auth/UserContext";
import LoggedInPageTitle from "../LoggedInLayout/LoggedInPageTitle";
import { useState } from "react";
import { useDebounceValue } from "../../common/hooks";
import ToolbarContainer from "../../common/components/ui/Toolbar/ToolbarContainer";
import QueryTextFieldWithResourceSelect from "./QueryTextFieldWithResourceSelect";
import FilterButton from "./FilterButton";
import { ResourceType } from "./models";
import { useGetBooks } from "../../common/api/clients/bookClient";
import ResourceGrid from "./ResourceGrid";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query);
  const [resourceType, setResourceType] = useState<ResourceType>("book");

  const isBookEnabled = resourceType === "book" && !!debouncedQuery;

  const { data: { books = [] } = {} } = useGetBooks({
    page: 0,
    size: 10,
    query: debouncedQuery,
    enabled: isBookEnabled,
  });

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <LoggedInPageContainer spacing={3}>
      <LoggedInPageTitle>
        {isPlLanguage
          ? "Szukaj książek, autorów oraz użytkowników"
          : "Search books, authors and users"}
      </LoggedInPageTitle>
      <ToolbarContainer>
        <QueryTextFieldWithResourceSelect
          query={query}
          onQueryChange={setQuery}
          resourceType={resourceType}
          onResourceTypeChange={setResourceType}
        />
        <FilterButton />
      </ToolbarContainer>
      <ResourceGrid resources={books} resourceType={resourceType} />
    </LoggedInPageContainer>
  );
}
